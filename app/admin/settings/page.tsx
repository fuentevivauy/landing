'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { Settings, User, Shield, Bell, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function AdminSettings() {
    const supabase = createClient();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const handleUpdatePassword = async () => {
        if (!password || password !== confirmPassword) {
            alert('Las contraseñas no coinciden o están vacías.');
            return;
        }

        setIsUpdatingPassword(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;
            alert('¡Contraseña actualizada exitosamente!');
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            console.error('Error al actualizar contraseña:', error);
            alert('Error al actualizar: ' + error.message);
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    return (
        <div className="flex w-full min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <AdminSidebar />
            
            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <div className="max-w-4xl mx-auto p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Ajustes</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Configuración de tu cuenta y preferencias.</p>
                    </header>

                    <div className="space-y-6">
                        {/* Profile section */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center transition-colors">
                                    <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-800 dark:text-white">Perfil</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Información de tu cuenta.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Nombre de la tienda</label>
                                    <input 
                                        type="text" 
                                        defaultValue="Fuente Viva" 
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-colors shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email de contacto</label>
                                    <input 
                                        type="email" 
                                        defaultValue=""
                                        placeholder="contacto@fuenteviva.com"
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-colors shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security section */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center transition-colors">
                                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-800 dark:text-white">Seguridad</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Cambiá tu contraseña de acceso al panel.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Nueva contraseña</label>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-colors shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Confirmar contraseña</label>
                                    <input 
                                        type="password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-colors shadow-sm"
                                    />
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleUpdatePassword}
                                disabled={isUpdatingPassword}
                                className="mt-4 px-5 py-2.5 bg-slate-900 dark:bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isUpdatingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                                Actualizar contraseña
                            </motion.button>
                        </div>

                        {/* WhatsApp section */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center transition-colors">
                                    <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-800 dark:text-white">WhatsApp</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Configurá el número de contacto para las consultas.</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Número de WhatsApp</label>
                                <input 
                                    type="tel" 
                                    defaultValue=""
                                    placeholder="+598 99 123 456"
                                    className="w-full max-w-sm px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-colors shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
