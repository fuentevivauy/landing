'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Package, 
    Settings, 
    LogOut, 
    BarChart3,
    Droplets,
    Moon,
    Sun
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Productos', href: '/admin/products', icon: Package },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Ajustes', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col sticky top-0 hidden md:flex transition-colors duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
                <div className="bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 p-2 rounded-xl">
                    <Droplets className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Fuente Viva</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Panel Admin</p>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Menú Principal</div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
                    const Icon = item.icon;

                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 shadow-sm border border-sky-100/50 dark:border-sky-800/50' 
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}`} />
                                <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <button 
                    onClick={toggleTheme}
                    className="flex items-center justify-between px-4 py-3 w-full rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                    <div className="flex items-center space-x-3">
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="font-medium">{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
                    </div>
                </button>
                <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-600 dark:text-rose-400 hover:bg-red-50 dark:hover:bg-rose-500/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
