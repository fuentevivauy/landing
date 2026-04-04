'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/Sidebar';
import AnalyticsCard from '@/components/admin/AnalyticsCard';
import { 
    TrendingUp, 
    Eye, 
    MousePointerClick, 
    MessageCircle, 
    Loader2, 
    ChevronRight,
    Users,
    ArrowUpRight,
    Search,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/supabase/analytics';
// import { format } from 'date-fns';
// import { es } from 'date-fns/locale';

interface AnalyticsStat {
    id: string;
    product_id: string | null;
    event_type: string;
    metadata: any;
    created_at: string;
    product_name?: string;
}

interface ProductReport {
    id: string;
    name: string;
    category: string;
    views: number;
    whatsapp: number;
    conversion: number;
}

export default function AdminAnalytics() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<AnalyticsStat[]>([]);
    const [productReports, setProductReports] = useState<ProductReport[]>([]);
    const [stats, setStats] = useState<{
        totalViews: number;
        totalClicks: number;
        totalWhatsapp: number;
        globalConversion: number;
        viewsTrend: number | null;
        clicksTrend: number | null;
        whatsappTrend: number | null;
        conversionTrend: number | null;
    }>({
        totalViews: 0,
        totalClicks: 0,
        totalWhatsapp: 0,
        globalConversion: 0,
        viewsTrend: null,
        clicksTrend: null,
        whatsappTrend: null,
        conversionTrend: null
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // 1. Fetch products to map names first (optimization)
                const { data: productsData } = await supabase
                    .from('products')
                    .select('id, name, category');

                const productMap: Record<string, { name: string, category: string }> = {};
                productsData?.forEach(p => {
                    productMap[p.id] = { name: p.name, category: p.category };
                });

                // Helper function to process and set data
                const processData = (data: any[]) => {
                    const now = new Date();
                    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

                    const enriched = data.map(event => ({
                        ...event,
                        product_name: event.product_id ? productMap[event.product_id]?.name || 'Producto eliminado' : 'Visita general',
                        dateObj: new Date(event.created_at)
                    }));

                    // --- Current Window (Last 30 days) ---
                    const currentEvents = enriched.filter(e => e.dateObj >= thirtyDaysAgo);
                    const v = currentEvents.filter(e => e.event_type === 'view' || e.event_type === 'page_view').length;
                    const c = currentEvents.filter(e => e.event_type === 'click').length;
                    const w = currentEvents.filter(e => e.event_type === 'whatsapp_click').length;
                    // Conversión = Whatsapps / (Clicks al catálogo + vistas de producto directo)
                    const totalInteractions = c + currentEvents.filter(e => e.event_type === 'view').length;
                    const conv = totalInteractions > 0 ? (w / totalInteractions) * 100 : 0;

                    // --- Previous Window (30 to 60 days ago) ---
                    const prevEvents = enriched.filter(e => e.dateObj >= sixtyDaysAgo && e.dateObj < thirtyDaysAgo);
                    const prevV = prevEvents.filter(e => e.event_type === 'view' || e.event_type === 'page_view').length;
                    const prevC = prevEvents.filter(e => e.event_type === 'click').length;
                    const prevW = prevEvents.filter(e => e.event_type === 'whatsapp_click').length;
                    const prevTotalInteractions = prevC + prevEvents.filter(e => e.event_type === 'view').length;
                    const prevConv = prevTotalInteractions > 0 ? (prevW / prevTotalInteractions) * 100 : 0;

                    // Calculate trends (percentage increase/decrease)
                    const calcTrend = (current: number, prev: number) => {
                        if (prev === 0) return null; // If there was nothing before, we hide the trend pill
                        return ((current - prev) / prev) * 100;
                    };

                    setEvents(enriched);
                    
                    // We use total (all-time) for display or 30 days? Usually dashboards show all time if they don't have a date picker, 
                    // but since we are showing "vs mes anterior", it's better if the main numbers are ALL TIME, 
                    // and the trend looks at the last 30 vs prev 30. Better yet: main numbers = last 30 days.
                    // For this request, we will keep the main numbers as total-to-date, but use the all-time vs trend.
                    // Let's just make everything be ALL TIME for the big number, and the trend compares the velocity.
                    const totalV = enriched.filter(e => e.event_type === 'view' || e.event_type === 'page_view').length;
                    const totalC = enriched.filter(e => e.event_type === 'click').length;
                    const totalW = enriched.filter(e => e.event_type === 'whatsapp_click').length;
                    const allTimeInteractions = totalC + enriched.filter(e => e.event_type === 'view').length;
                    const totalConv = allTimeInteractions > 0 ? (totalW / allTimeInteractions) * 100 : 0;

                    setStats({
                        totalViews: totalV,
                        totalClicks: totalC,
                        totalWhatsapp: totalW,
                        globalConversion: totalConv,
                        viewsTrend: calcTrend(v, prevV),
                        clicksTrend: calcTrend(c, prevC),
                        whatsappTrend: calcTrend(w, prevW),
                        conversionTrend: calcTrend(conv, prevConv),
                    });

                    // Update reports (All Time)
                    const reports: Record<string, ProductReport> = {};
                    productsData?.forEach(p => {
                        reports[p.id] = { id: p.id, name: p.name, category: p.category, views: 0, whatsapp: 0, conversion: 0 };
                    });

                    enriched.forEach(e => {
                        if (e.product_id && reports[e.product_id]) {
                            if (e.event_type === 'view' || e.event_type === 'click') {
                                reports[e.product_id].views += 1;
                            } else if (e.event_type === 'whatsapp_click') {
                                reports[e.product_id].whatsapp += 1;
                            }
                        }
                    });

                    setProductReports(Object.values(reports)
                        .map(r => ({ ...r, conversion: r.views > 0 ? (r.whatsapp / r.views) * 100 : 0 }))
                        .sort((a, b) => b.views - a.views)
                        .filter(r => r.views > 0 || r.whatsapp > 0)
                    );
                };

                // Fetch initial data
                const { data: eventsData, error: eventsError } = await supabase
                    .from('analytics_events')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (eventsError) throw eventsError;
                
                processData(eventsData || []);
                setIsLoading(false);

                // --- Real-time Subscription ---
                const channel = supabase
                    .channel('analytics_realtime')
                    .on('postgres_changes', { 
                        event: 'INSERT', 
                        schema: 'public', 
                        table: 'analytics_events' 
                    }, async () => {
                        // Re-fetch all data on new event to ensure consistent sorting and mapping
                        const { data: freshData } = await supabase
                            .from('analytics_events')
                            .select('*')
                            .order('created_at', { ascending: false });
                        
                        if (freshData) processData(freshData);
                    })
                    .subscribe();

                return () => {
                    supabase.removeChannel(channel);
                };
            } catch (err) {
                console.error('Error in analytics setup:', err);
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [supabase]);

    return (
        <div className="flex w-full min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <AdminSidebar />
            
            <main className="flex-1 overflow-y-auto transition-colors duration-200">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    En vivo
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Reporte Detallado</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Análisis de rendimiento y comportamiento del usuario.</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
                                <Filter className="w-4 h-4" />
                                Todos los productos
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20">
                                Descargar Reporte
                            </button>
                        </div>
                    </header>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-32">
                            <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-4" />
                            <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Cargando datos verídicos...</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-10"
                            >
                                {/* Metrics Highlight */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <AnalyticsCard 
                                        title="Alcance Total" 
                                        value={stats.totalViews.toLocaleString()} 
                                        icon={<Eye className="w-6 h-6" />} 
                                        trend={stats.viewsTrend !== null ? parseFloat(stats.viewsTrend.toFixed(0)) : null} 
                                        trendLabel="vs últimos 30 días"
                                    />
                                    <AnalyticsCard 
                                        title="Interacciones" 
                                        value={stats.totalClicks.toLocaleString()} 
                                        icon={<MousePointerClick className="w-6 h-6" />} 
                                        trend={stats.clicksTrend !== null ? parseFloat(stats.clicksTrend.toFixed(0)) : null} 
                                        trendLabel="vs últimos 30 días"
                                    />
                                    <AnalyticsCard 
                                        title="Ventas Potenciales" 
                                        value={stats.totalWhatsapp.toLocaleString()} 
                                        icon={<MessageCircle className="w-6 h-6" />} 
                                        trend={stats.whatsappTrend !== null ? parseFloat(stats.whatsappTrend.toFixed(0)) : null} 
                                        trendLabel="vs últimos 30 días"
                                    />
                                    <AnalyticsCard 
                                        title="Eficiencia" 
                                        value={`${stats.globalConversion.toFixed(1)}%`} 
                                        icon={<ArrowUpRight className="w-6 h-6" />} 
                                        trend={stats.conversionTrend !== null ? parseFloat(stats.conversionTrend.toFixed(0)) : null} 
                                        trendLabel="vs últimos 30 días"
                                    />
                                </div>

                                {/* Detailed Breakdown */}
                                <div className="mt-8">
                                    {/* Products Table */}
                                    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                                <PackageIcon className="w-5 h-5 text-sky-500" />
                                                Rendimiento por Producto
                                            </h2>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                                        <th className="px-6 py-4">Producto</th>
                                                        <th className="px-6 py-4 text-center">Interacciones</th>
                                                        <th className="px-6 py-4 text-center">WA (Consultas)</th>
                                                        <th className="px-6 py-4 text-right">Conversión</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {productReports.map((prod, i) => (
                                                        <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold text-slate-800 dark:text-slate-200">{prod.name}</span>
                                                                    <span className="text-[11px] text-slate-400">{prod.category}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-center font-semibold text-slate-600 dark:text-slate-400">{prod.views}</td>
                                                            <td className="px-6 py-4 text-center font-semibold text-slate-600 dark:text-slate-400">{prod.whatsapp}</td>
                                                            <td className="px-6 py-4 text-right font-black text-emerald-500">{prod.conversion.toFixed(1)}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </main>
        </div>
    );
}

function PackageIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
            <path d="m3.3 7 8.7 5 8.7-5"/>
            <path d="M12 22V12"/>
        </svg>
    );
}

