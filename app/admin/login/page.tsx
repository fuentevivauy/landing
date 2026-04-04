'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError('Email o contraseña incorrectos. Intentá de nuevo.');
            setIsLoading(false);
        } else {
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div 
            className="min-h-screen flex"
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            {/* Left Panel — Branding */}
            <div 
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
                style={{ 
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a4c 50%, #0f4c6e 100%)',
                }}
            >
                {/* Background pattern */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(56,189,248,0.35)'
                        }}>
                            <Droplets style={{ width: 22, height: 22, color: 'white' }} />
                        </div>
                        <div>
                            <div style={{ color: 'white', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>Fuente Viva</div>
                            <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>Panel de Administración</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <h1 style={{ 
                            color: 'white', fontWeight: 900, fontSize: 42, 
                            lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 
                        }}>
                            Gestioná tu catálogo con facilidad.
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7, maxWidth: 380 }}>
                            Editá productos, subí imágenes y revisá las métricas de tu tienda, todo desde un solo lugar.
                        </p>
                    </motion.div>

                    <div style={{ display: 'flex', gap: 24 }}>
                        {[
                            { label: 'Productos', value: 'Catálogo' },
                            { label: 'Analytics', value: 'Métricas' },
                            { label: 'Imágenes', value: 'Galería' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                style={{
                                    padding: '12px 16px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 13 }}>{item.value}</div>
                                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <p style={{ color: '#475569', fontSize: 12 }}>
                        © 2025 Fuente Viva · Todos los derechos reservados
                    </p>
                </div>
            </div>

            {/* Right Panel — Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ width: '100%', maxWidth: 420 }}
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                        <div style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Droplets style={{ width: 22, height: 22, color: 'white' }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>Fuente Viva</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Panel Admin</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8 }}>
                            Bienvenido de nuevo
                        </h2>
                        <p style={{ color: '#64748b', fontSize: 15 }}>
                            Ingresá con tu cuenta para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail style={{ 
                                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                    width: 16, height: 16, color: '#9ca3af'
                                }} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@fuenteviva.com"
                                    style={{
                                        width: '100%', paddingLeft: 42, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                                        border: `1px solid ${error ? '#fca5a5' : '#e5e7eb'}`,
                                        borderRadius: 10, fontSize: 14, outline: 'none',
                                        background: 'white', color: '#111827',
                                        boxSizing: 'border-box', transition: 'border-color 0.15s',
                                        fontFamily: 'inherit',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                                    onBlur={(e) => e.target.style.borderColor = error ? '#fca5a5' : '#e5e7eb'}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                                    Contraseña
                                </label>
                                <a href="#" style={{ fontSize: 12, color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock style={{ 
                                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                    width: 16, height: 16, color: '#9ca3af'
                                }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%', paddingLeft: 42, paddingRight: 42, paddingTop: 12, paddingBottom: 12,
                                        border: `1px solid ${error ? '#fca5a5' : '#e5e7eb'}`,
                                        borderRadius: 10, fontSize: 14, outline: 'none',
                                        background: 'white', color: '#111827',
                                        boxSizing: 'border-box', transition: 'border-color 0.15s',
                                        fontFamily: 'inherit',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                                    onBlur={(e) => e.target.style.borderColor = error ? '#fca5a5' : '#e5e7eb'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ 
                                        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                                        display: 'flex', color: '#9ca3af'
                                    }}
                                >
                                    {showPassword 
                                        ? <EyeOff style={{ width: 16, height: 16 }} />
                                        : <Eye style={{ width: 16, height: 16 }} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '10px 14px', borderRadius: 8,
                                    background: '#fef2f2', border: '1px solid #fecaca',
                                    color: '#dc2626', fontSize: 13, fontWeight: 500,
                                }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%', padding: '14px 24px',
                                background: isLoading ? '#475569' : '#0f172a',
                                color: 'white', border: 'none', borderRadius: 10,
                                fontSize: 15, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'background 0.15s', fontFamily: 'inherit',
                                boxShadow: '0 4px 14px rgba(15,23,42,0.25)',
                                marginTop: 4,
                            }}
                        >
                            {isLoading ? (
                                <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <>
                                    <span>Ingresar al panel</span>
                                    <ArrowRight style={{ width: 18, height: 18 }} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 32, fontWeight: 500 }}>
                        Uso exclusivo para la administración de Fuente Viva.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
