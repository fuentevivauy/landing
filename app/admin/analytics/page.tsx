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
    const [stats, setStats] = useState({
        totalViews: 0,
        totalClicks: 0,
        totalWhatsapp: 0,
        globalConversion: 0
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
                    const enriched = data.map(event => ({
                        ...event,
                        product_name: event.product_id ? productMap[event.product_id]?.name || 'Producto eliminado' : 'Visita general'
                    }));

                    const v = enriched.filter(e => e.event_type === 'view' || e.event_type === 'page_view').length;
                    const c = enriched.filter(e => e.event_type === 'click').length;
                    const w = enriched.filter(e => e.event_type === 'whatsapp_click').length;
                    const conv = v > 0 ? (w / v) * 100 : 0;

                    setEvents(enriched);
                    setStats({
                        totalViews: v,
                        totalClicks: c,
                        totalWhatsapp: w,
                        globalConversion: conv
                    });

                    // Update reports
                    const reports: Record<string, ProductReport> = {};
                    productsData?.forEach(p => {
                        reports[p.id] = { id: p.id, name: p.name, category: p.category, views: 0, whatsapp: 0, conversion: 0 };
                    });

                    enriched.forEach(e => {
                        if (e.product_id && reports[e.product_id]) {
                            if (e.event_type === 'view') {
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

                    {/* 🔧 Diagnóstico de tracking — REMOVER después de verificar */}
                    <DiagnosticPanel />

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
                                        trend={0} 
                                        trendLabel="Vistas en total"
                                    />
                                    <AnalyticsCard 
                                        title="Interacciones" 
                                        value={stats.totalClicks.toLocaleString()} 
                                        icon={<MousePointerClick className="w-6 h-6" />} 
                                        trend={0} 
                                        trendLabel="Clics en el catálogo"
                                    />
                                    <AnalyticsCard 
                                        title="Ventas Potenciales" 
                                        value={stats.totalWhatsapp.toLocaleString()} 
                                        icon={<MessageCircle className="w-6 h-6" />} 
                                        trend={0} 
                                        trendLabel="Consultas por WA"
                                    />
                                    <AnalyticsCard 
                                        title="Eficiencia" 
                                        value={`${stats.globalConversion.toFixed(1)}%`} 
                                        icon={<ArrowUpRight className="w-6 h-6" />} 
                                        trend={0} 
                                        trendLabel="Conversión global"
                                    />
                                </div>

                                {/* Detailed Breakdown */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Products Table */}
                                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
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
                                                        <th className="px-6 py-4 text-center">Vistas</th>
                                                        <th className="px-6 py-4 text-center">WA</th>
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

                                    {/* Recent Activity */}
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                                        <div className="p-6 border-b border-slate-50 dark:border-slate-800">
                                            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-sky-500" />
                                                Actividad Reciente
                                            </h2>
                                        </div>
                                        <div className="flex-1 overflow-y-auto max-h-[500px]">
                                            <div className="divide-y divide-slate-50 dark:divide-slate-800">
                                                {events.slice(0, 15).map((e, i) => (
                                                    <div key={i} className="p-4 flex items-start gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                        <div className={`p-2 rounded-lg shrink-0 ${
                                                            e.event_type === 'whatsapp_click' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' :
                                                            e.event_type === 'view' ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-500' :
                                                            'bg-slate-50 dark:bg-slate-800 text-slate-400'
                                                        }`}>
                                                            {e.event_type === 'whatsapp_click' ? <MessageCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </div>
                                                        <div className="flex flex-col min-w-0">
                                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">
                                                                {e.event_type === 'whatsapp_click' ? 'Consulta WhatsApp' : 'Vista de Producto'}
                                                            </p>
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-500 truncate mb-1">
                                                                {e.product_name}
                                                            </p>
                                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">
                                                                {new Date(e.created_at).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' })} · {new Date(e.created_at).toLocaleDateString('es-UY', { day: 'numeric', month: 'short' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-4 border-t border-slate-50 dark:border-slate-800 text-center">
                                            <button className="text-xs font-bold text-sky-500 hover:text-sky-600 transition-colors uppercase tracking-widest">
                                                Ver todo el historial
                                            </button>
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

// 🔧 Panel de diagnóstico temporal — REMOVER una vez confirmado que funciona
function DiagnosticPanel() {
    const [testResult, setTestResult] = useState<string | null>(null);
    const [testing, setTesting] = useState(false);
    const supabase = createClient();

    const runTest = async (eventType: string) => {
        setTesting(true);
        setTestResult(null);
        try {
            // Test 1: Direct insert via supabase client (bypass trackEvent)
            const { data, error } = await supabase
                .from('analytics_events')
                .insert({
                    product_id: null,
                    event_type: eventType,
                    metadata: { source: 'diagnostic_test', timestamp: new Date().toISOString() }
                })
                .select();

            if (error) {
                setTestResult(`❌ ERROR (${eventType}): ${error.message} | Code: ${error.code} | Details: ${error.details} | Hint: ${error.hint}`);
            } else {
                setTestResult(`✅ OK (${eventType}): Insertado correctamente. ID: ${data?.[0]?.id || 'N/A'}`);
            }
        } catch (err: any) {
            setTestResult(`💥 EXCEPTION (${eventType}): ${err.message}`);
        }
        setTesting(false);
    };

    return (
        <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-2xl">
            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">🔧 Diagnóstico de Eventos</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">Prueba insertar cada tipo de evento para ver cuál falla:</p>
            <div className="flex flex-wrap gap-3 mb-4">
                {['view', 'click', 'whatsapp_click', 'page_view'].map((type) => (
                    <button
                        key={type}
                        onClick={() => runTest(type)}
                        disabled={testing}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-600 rounded-lg text-sm font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors disabled:opacity-50"
                    >
                        Test: {type}
                    </button>
                ))}
            </div>
            {testResult && (
                <pre className="p-4 bg-white dark:bg-slate-900 rounded-lg text-sm font-mono break-all whitespace-pre-wrap border border-amber-200 dark:border-amber-800">
                    {testResult}
                </pre>
            )}
        </div>
    );
}
