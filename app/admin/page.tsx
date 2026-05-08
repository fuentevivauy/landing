'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/Sidebar';
import AnalyticsCard from '@/components/admin/AnalyticsCard';
import { Eye, MousePointerClick, MessageCircle, Package, Loader2 } from 'lucide-react';
import { DBProduct, AnalyticsEvent } from '@/lib/types/admin';

type TopProductData = {
    name: string;
    cat: string;
    views: number;
    conv: string;
};

export default function AdminDashboard() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(true);
    
    const [stats, setStats] = useState<{
        views: number;
        clicks: number;
        whatsapp: number;
        activeProducts: number;
        viewsTrend: number | null;
        clicksTrend: number | null;
        whatsappTrend: number | null;
        productsTrend: number | null;
    }>({
        views: 0,
        clicks: 0,
        whatsapp: 0,
        activeProducts: 0,
        viewsTrend: null,
        clicksTrend: null,
        whatsappTrend: null,
        productsTrend: null,
    });

    const [topProducts, setTopProducts] = useState<TopProductData[]>([]);

    useEffect(() => {
        async function fetchDashboardData() {
            // 1. Fetch active products (con created_at para calcular tendencia)
            const { count: productCount, data: recentProducts } = await supabase
                .from('products')
                .select('id, name, category, created_at', { count: 'exact' })
                .eq('in_stock', true)
                .order('created_at', { ascending: false });

            // 2. Fetch all analytics events con timestamps
            const { data: events } = await supabase
                .from('analytics_events')
                .select('product_id, event_type, created_at');

            const safeEvents = events || [];

            // --- Cálculo de tendencias: últimos 30 días vs 30-60 días previos ---
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

            const enriched = safeEvents.map(e => ({ ...e, dateObj: new Date(e.created_at) }));
            const currentEvents = enriched.filter(e => e.dateObj >= thirtyDaysAgo);
            const prevEvents = enriched.filter(e => e.dateObj >= sixtyDaysAgo && e.dateObj < thirtyDaysAgo);

            const curV = currentEvents.filter(e => e.event_type === 'view').length;
            const curC = currentEvents.filter(e => e.event_type === 'click').length;
            const curW = currentEvents.filter(e => e.event_type === 'whatsapp_click').length;
            const prevV = prevEvents.filter(e => e.event_type === 'view').length;
            const prevC = prevEvents.filter(e => e.event_type === 'click').length;
            const prevW = prevEvents.filter(e => e.event_type === 'whatsapp_click').length;

            const calcTrend = (current: number, prev: number) => {
                if (prev === 0) return null;
                return Math.round(((current - prev) / prev) * 100);
            };

            // Tendencia de productos activos: comparamos creados últimos 30d vs 30-60d
            const curProducts = (recentProducts || []).filter(p => new Date(p.created_at) >= thirtyDaysAgo).length;
            const prevProducts = (recentProducts || []).filter(p => {
                const d = new Date(p.created_at);
                return d >= sixtyDaysAgo && d < thirtyDaysAgo;
            }).length;

            // Calculate totals (all-time)
            const totalViews = safeEvents.filter(e => e.event_type === 'view').length;
            const totalClicks = safeEvents.filter(e => e.event_type === 'click').length;
            const totalWhatsapp = safeEvents.filter(e => e.event_type === 'whatsapp_click').length;

            setStats({
                views: totalViews,
                clicks: totalClicks,
                whatsapp: totalWhatsapp,
                activeProducts: productCount || 0,
                viewsTrend: calcTrend(curV, prevV),
                clicksTrend: calcTrend(curC, prevC),
                whatsappTrend: calcTrend(curW, prevW),
                productsTrend: calcTrend(curProducts, prevProducts),
            });
            
            // Calculate top products
            // First group events by product_id
            const productStats: Record<string, { views: number, whatsapp: number }> = {};
            
            for (const event of safeEvents) {
                if (!event.product_id) continue;
                
                if (!productStats[event.product_id]) {
                    productStats[event.product_id] = { views: 0, whatsapp: 0 };
                }
                
                if (event.event_type === 'view') {
                    productStats[event.product_id].views += 1;
                } else if (event.event_type === 'whatsapp_click') {
                    productStats[event.product_id].whatsapp += 1;
                }
            }
            
            // If we have some events, map to product info
            let finalTopProducts: TopProductData[] = [];
            
            if (Object.keys(productStats).length > 0 && recentProducts) {
                // Fetch product names for the ones that have stats
                const productIdsWithStats = Object.keys(productStats);
                const { data: statsProducts } = await supabase
                    .from('products')
                    .select('id, name, category')
                    .in('id', productIdsWithStats);
                    
                if (statsProducts) {
                    finalTopProducts = statsProducts.map(p => {
                        const s = productStats[p.id];
                        const convRate = s.views > 0 ? ((s.whatsapp / s.views) * 100).toFixed(1) : '0.0';
                        return {
                            name: p.name,
                            cat: p.category,
                            views: s.views,
                            conv: `${convRate}%`
                        };
                    }).sort((a, b) => b.views - a.views).slice(0, 5);
                }
            } else if (recentProducts) {
                // Fallback: show recent products with 0 stats if no analytics yet
                finalTopProducts = recentProducts.slice(0, 5).map(p => ({
                    name: p.name,
                    cat: p.category,
                    views: 0,
                    conv: '0.0%'
                }));
            }
            
            setTopProducts(finalTopProducts);
            setIsLoading(false);
        }
        
        fetchDashboardData();

        // --- Real-time Subscription ---
        const channel = supabase
            .channel('dashboard_realtime')
            .on('postgres_changes', { 
                event: 'INSERT', 
                schema: 'public', 
                table: 'analytics_events' 
            }, () => {
                fetchDashboardData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <div className="flex w-full min-h-screen">
            <AdminSidebar />
            
            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <div className="max-w-7xl mx-auto p-8">
                    <header className="mb-10">
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Bienvenido de nuevo 👋</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Acá tenés un resumen del rendimiento de tus productos.</p>
                    </header>

                    {isLoading ? (
                        <div className="flex items-center justify-center p-20">
                            <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Analytics Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                <AnalyticsCard
                                    title="Vistas de Productos"
                                    value={stats.views.toString()}
                                    trend={stats.viewsTrend}
                                    icon={<Eye className="w-6 h-6" />}
                                    trendLabel="últimos 30 días vs 30 días previos"
                                />
                                <AnalyticsCard
                                    title="Clics en Catálogo"
                                    value={stats.clicks.toString()}
                                    trend={stats.clicksTrend}
                                    icon={<MousePointerClick className="w-6 h-6" />}
                                    trendLabel="últimos 30 días vs 30 días previos"
                                />
                                <AnalyticsCard
                                    title="Consultas a WhatsApp"
                                    value={stats.whatsapp.toString()}
                                    trend={stats.whatsappTrend}
                                    icon={<MessageCircle className="w-6 h-6" />}
                                    trendLabel="últimos 30 días vs 30 días previos"
                                />
                                <AnalyticsCard
                                    title="Productos Activos"
                                    value={stats.activeProducts.toString()}
                                    trend={stats.productsTrend}
                                    icon={<Package className="w-6 h-6" />}
                                    trendLabel="nuevos últimos 30 días vs previos"
                                />
                            </div>

                            {/* Section: Top Products */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                                    <span className="bg-sky-500 w-2 h-6 rounded-full mr-3 inline-block"></span>
                                    Productos más vistos y recientes
                                </h2>
                                
                                <div className="overflow-x-auto">
                                    {topProducts.length > 0 ? (
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-100 dark:border-slate-800 text-sm text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                                                    <th className="pb-4 font-semibold">Producto</th>
                                                    <th className="pb-4 font-semibold">Categoría</th>
                                                    <th className="pb-4 font-semibold text-right">Vistas</th>
                                                    <th className="pb-4 font-semibold text-right">Conversión a WA</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {topProducts.map((prod, i) => (
                                                    <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                        <td className="py-4 font-medium text-slate-800 dark:text-slate-200">{prod.name}</td>
                                                        <td className="py-4 text-slate-500 dark:text-slate-400">{prod.cat}</td>
                                                        <td className="py-4 text-slate-800 dark:text-slate-200 text-right font-semibold">{prod.views}</td>
                                                        <td className="py-4 text-emerald-600 dark:text-emerald-500 font-bold text-right">{prod.conv}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="text-center py-8 text-slate-500">
                                            Aún no hay productos registrados.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
