'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/Sidebar';
import ProductModal from '@/components/admin/ProductModal';
import { Package, Plus, Search, Edit2, Trash2, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DBProduct } from '@/lib/types/admin';

type Feedback = { type: 'success' | 'error'; text: string } | null;

export default function AdminProducts() {
    const supabase = createClient();
    const [products, setProducts] = useState<DBProduct[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [feedback, setFeedback] = useState<Feedback>(null);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<DBProduct | null>(null);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    const showFeedback = (f: Feedback) => {
        setFeedback(f);
        setTimeout(() => setFeedback(null), 4000);
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            setProducts(data);
            // Extract unique categories
            const uniqueCats = Array.from(new Set(data.map(p => p.category))).filter(Boolean);
            setCategories(uniqueCats);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async () => {
        if (!productToDelete) return;

        const { error } = await supabase.from('products').delete().eq('id', productToDelete);

        if (!error) {
            setProducts(prev => prev.filter(p => p.id !== productToDelete));
            setProductToDelete(null);
            showFeedback({ type: 'success', text: 'Producto eliminado correctamente.' });
        } else {
            setProductToDelete(null);
            showFeedback({ type: 'error', text: 'Error al eliminar el producto. Intentá de nuevo.' });
        }
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: DBProduct) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === '' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex w-full min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <AdminSidebar />
            
            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <div className="max-w-7xl mx-auto p-8">
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Productos</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Gestioná tu catálogo completo.</p>
                        </div>
                        <motion.button
                            onClick={handleCreate}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-sky-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-slate-900/20 dark:shadow-sky-900/20 hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Nuevo producto
                        </motion.button>
                    </header>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all shadow-sm"
                            />
                        </div>
                        <div className="w-full sm:w-64">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all shadow-sm appearance-none"
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full min-h-[400px]">
                                <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                                    <Package className="w-8 h-8 text-slate-300 dark:text-slate-500" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No hay productos</h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    {products.length === 0 
                                        ? "Todavía no cargaste ningún producto a la base de datos."
                                        : "No encontramos productos que coincidan con tu búsqueda."}
                                </p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Producto</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoría</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Precio</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Destacado</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, i) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-700/50">
                                                        {product.image_thumbnail || product.image_main ? (
                                                            <img src={product.image_thumbnail || product.image_main!} alt={product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Package className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                                        )}
                                                    </div>
                                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{product.category}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">${Number(product.price).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    product.in_stock 
                                                        ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                                                        : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                                }`}>
                                                    {product.in_stock ? 'En stock' : 'Sin stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    product.featured 
                                                        ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' 
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                                }`}>
                                                    {product.featured ? '★ Destacado' : 'Normal'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <button 
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setProductToDelete(product.id)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                
                {/* Toast de feedback */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold ${
                                feedback.type === 'success'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-red-500 text-white'
                            }`}
                        >
                            {feedback.type === 'success'
                                ? <CheckCircle className="w-5 h-5 shrink-0" />
                                : <XCircle className="w-5 h-5 shrink-0" />}
                            {feedback.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={editingProduct}
                    onSave={() => {
                        fetchProducts();
                    }}
                    categories={categories}
                />
                
                {/* Delete Confirmation Modal */}
                {productToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 dark:border-slate-800"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">¿Eliminar producto?</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Esta acción no se puede deshacer. El producto se borrará permanentemente de la base de datos.</p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setProductToDelete(null)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-sm transition-colors"
                                >
                                    Sí, eliminar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
}
