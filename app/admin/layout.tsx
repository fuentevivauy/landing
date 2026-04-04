import React from 'react';
import { ThemeProvider } from '@/components/admin/ThemeProvider';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200"
                style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
            >
                {children}
            </div>
        </ThemeProvider>
    );
}
