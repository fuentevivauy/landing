'use client';

import AdminSidebar from '@/components/admin/Sidebar';
import { TrendingUp, Eye, MousePointerClick, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminAnalytics() {
    return (
        <div className="flex w-full min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <AdminSidebar />
            
            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <div className="max-w-7xl mx-auto p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Analytics</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Vista detallada del rendimiento de tu catálogo.</p>
                    </header>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex flex-col items-center justify-center text-center transition-colors" style={{ minHeight: 400 }}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center mb-4"
                        >
                            <TrendingUp className="w-8 h-8 text-sky-500 dark:text-sky-400" />
                        </motion.div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Analytics en camino</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
                            Cuando los usuarios visiten y hagan clic en tus productos, las estadísticas aparecerán aquí automáticamente. 
                            El sistema ya está preparado para registrar vistas, clics y consultas a WhatsApp.
                        </p>
                        <div className="flex gap-6 mt-8">
                            {[
                                { icon: Eye, label: 'Vistas de productos' },
                                { icon: MousePointerClick, label: 'Clics en catálogo' },
                                { icon: MessageCircle, label: 'Consultas a WhatsApp' },
                            ].map(({ icon: Icon, label }, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center transition-colors">
                                        <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium text-center max-w-20">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
