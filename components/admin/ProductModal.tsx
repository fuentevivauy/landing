'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Loader2, Image as ImageIcon, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DBProduct } from '@/lib/types/admin';
import { createClient } from '@/lib/supabase/client';

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    product?: DBProduct | null;
    onSave: () => void;
    categories: string[];
};

type Feedback = { type: 'success' | 'error'; text: string } | null;

export default function ProductModal({ isOpen, onClose, product, onSave, categories }: ProductModalProps) {
    const supabase = createClient();
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        newCategory: '',
        in_stock: true,
        featured: false,
        display_order: 0,
        image_main: '',
        benefits: [] as string[],
        specs: {
            dimensions: '',
            diameter: '',
            weight: '',
            height: '',
        } as Record<string, string>,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price ? product.price.toString() : '',
                category: product.category || '',
                newCategory: '',
                in_stock: product.in_stock,
                featured: product.featured,
                display_order: product.display_order || 0,
                image_main: product.image_main || product.image_thumbnail || '',
                benefits: product.benefits || [],
                specs: {
                    dimensions: String(product.specs?.dimensions || ''),
                    diameter: String(product.specs?.diameter || ''),
                    weight: String(product.specs?.weight || ''),
                    height: String(product.specs?.height || ''),
                },
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                category: categories.length > 0 ? categories[0] : '',
                newCategory: '',
                in_stock: true,
                featured: false,
                display_order: categories.length > 0 ? 0 : 0,
                image_main: '',
                benefits: [],
                specs: {
                    dimensions: '',
                    diameter: '',
                    weight: '',
                    height: '',
                },
            });
        }
        setFeedback(null);
    }, [product, isOpen, categories]);

    if (!isOpen) return null;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setFeedback(null);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_main: publicUrl }));
        } catch (error: any) {
            setFeedback({ type: 'error', text: 'Error al subir la imagen: ' + (error.message || 'intente de nuevo.') });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback(null);

        try {
            const finalCategory = formData.newCategory.trim() !== '' ? formData.newCategory.trim() : formData.category;

            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: finalCategory,
                in_stock: formData.in_stock,
                featured: formData.featured,
                display_order: parseInt(String(formData.display_order)) || 0,
                image_thumbnail: formData.image_main,
                benefits: formData.benefits,
                specs: formData.specs,
            };

            if (product) {
                // Edición: NO se regenera el slug para preservar URLs y analíticas
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', product.id);
                if (error) throw error;
            } else {
                // Creación: se genera el slug solo una vez
                const baseSlug = formData.name.toLowerCase().trim().replace(/[\s\W-]+/g, '-');
                const randomString = Math.random().toString(36).substring(2, 6);
                const slug = `${baseSlug}-${randomString}`;

                const { error } = await supabase
                    .from('products')
                    .insert([{ ...productData, slug }]);
                if (error) throw error;
            }

            setFeedback({ type: 'success', text: '¡Producto guardado exitosamente!' });
            onSave();
            setTimeout(() => {
                onClose();
            }, 800);
        } catch (error: any) {
            setFeedback({ type: 'error', text: 'Error al guardar: ' + (error.message || 'intente de nuevo.') });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                        {product ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Foto Principal</label>
                            <div className="flex items-start gap-6">
                                <div className="w-32 h-32 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                                    {formData.image_main ? (
                                        <img src={formData.image_main} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                                    )}
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-sm">
                                        <Upload className="w-4 h-4" />
                                        {formData.image_main ? 'Cambiar Foto' : 'Subir Foto'}
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                    </label>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        Recomendado: Imagen cuadrada de al menos 800x800px. Formato JPG, PNG o WebP.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Name & Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Título del Producto *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all"
                                    placeholder="Ej. Fuente Buda Zen..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Precio ($) *</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="1"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Categoría *</label>
                            {formData.newCategory === '' && categories.length > 0 && (
                                <select
                                    value={formData.category}
                                    onChange={(e) => {
                                        if (e.target.value === 'NEW') {
                                            setFormData({ ...formData, newCategory: ' ' });
                                        } else {
                                            setFormData({ ...formData, category: e.target.value });
                                        }
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all mb-3"
                                >
                                    {categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                    <option value="NEW">+ Crear nueva categoría</option>
                                </select>
                            )}

                            {(formData.newCategory !== '' || categories.length === 0) && (
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        required
                                        value={formData.newCategory.trim() === '' ? '' : formData.newCategory}
                                        onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all"
                                        placeholder="Nombre de la nueva categoría"
                                    />
                                    {categories.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, newCategory: '' })}
                                            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Descripción</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Technical Specs */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">Datos Técnicos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">Medidas (cm)</label>
                                    <input
                                        type="text"
                                        value={formData.specs.dimensions}
                                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, dimensions: e.target.value } })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/50 outline-none"
                                        placeholder="Ej. 40x40x60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">Diámetro (cm)</label>
                                    <input
                                        type="text"
                                        value={formData.specs.diameter}
                                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, diameter: e.target.value } })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/50 outline-none"
                                        placeholder="Ej. 50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">Peso (kg)</label>
                                    <input
                                        type="text"
                                        value={formData.specs.weight}
                                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, weight: e.target.value } })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/50 outline-none"
                                        placeholder="Ej. 15"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">Altura (cm)</label>
                                    <input
                                        type="text"
                                        value={formData.specs.height}
                                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, height: e.target.value } })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/50 outline-none"
                                        placeholder="Ej. 80"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Beneficios del Producto</h3>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, benefits: [...formData.benefits, ''] })}
                                    className="flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700"
                                >
                                    <Plus className="w-3.5 h-3.5" /> AGREGAR
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.benefits.map((benefit, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={benefit}
                                            onChange={(e) => {
                                                const newBenefits = [...formData.benefits];
                                                newBenefits[index] = e.target.value;
                                                setFormData({ ...formData, benefits: newBenefits });
                                            }}
                                            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/50 outline-none"
                                            placeholder="Ej. Material resistente a la intemperie"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newBenefits = formData.benefits.filter((_, i) => i !== index);
                                                setFormData({ ...formData, benefits: newBenefits });
                                            }}
                                            className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {formData.benefits.length === 0 && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-2">
                                        No hay beneficios agregados.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Order & Toggles */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Orden de Visualización (Menor número aparece primero)</label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                                    className="w-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                                    checked={formData.in_stock}
                                    onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">En stock (A la venta)</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Producto Destacado</span>
                            </label>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    {/* Feedback inline */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`flex items-center gap-2 text-sm font-medium mb-4 ${feedback.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}
                            >
                                {feedback.type === 'success'
                                    ? <CheckCircle className="w-4 h-4 shrink-0" />
                                    : <XCircle className="w-4 h-4 shrink-0" />}
                                {feedback.text}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="product-form"
                            disabled={isSaving || isUploading}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 disabled:opacity-50 transition-colors shadow-lg"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                            {isSaving ? 'Guardando...' : 'Guardar Producto'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
