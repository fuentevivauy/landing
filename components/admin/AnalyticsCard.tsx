import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsCardProps {
    title: string;
    value: string | number;
    trend?: number | null;
    icon: ReactNode;
    trendLabel?: string;
}

export default function AnalyticsCard({ title, value, trend, icon, trendLabel = "vs mes anterior" }: AnalyticsCardProps) {
    const isPositive = typeof trend === 'number' && trend >= 0;
    const hasTrend = typeof trend === 'number';

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl">
                    {icon}
                </div>
                {hasTrend && (
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        isPositive ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
                    }`}>
                        {isPositive ? '+' : ''}{trend}%
                    </div>
                )}
            </div>
            
            <div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-1">{value}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {hasTrend ? trendLabel : "Faltan datos históricos"}
                </p>
            </div>
        </div>
    );
}
