// ─── Database Product (matches Supabase table) ───
export interface DBProduct {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number | null;
    price_formatted: string;
    category: string;
    in_stock: boolean;
    featured: boolean;
    display_order: number;
    benefits: string[];
    specs: Record<string, string | number | undefined>;
    image_thumbnail: string;
    image_carousel: string;
    image_gallery: string[];
    whatsapp_message: string;
    created_at: string;
    updated_at: string;
    video_url: string | null;
}

// ─── Analytics Event Types ───
export type AnalyticsEventType = 'view' | 'click' | 'whatsapp_click' | 'page_view';

export interface AnalyticsEvent {
    id: string;
    product_id: string | null;
    event_type: AnalyticsEventType;
    metadata: Record<string, unknown>;
    created_at: string;
}

// ─── Dashboard Stats ───
export interface DashboardStats {
    totalProducts: number;
    totalViews: number;
    totalClicks: number;
    totalWhatsApp: number;
    viewsTrend: number; // percentage change
    clicksTrend: number;
    whatsappTrend: number;
}

export interface ProductAnalytics {
    productId: string;
    productName: string;
    views: number;
    clicks: number;
    whatsappClicks: number;
    conversionRate: number; // whatsapp / views * 100
}

export interface TimeSeriesData {
    date: string;
    views: number;
    clicks: number;
    whatsapp: number;
}

// ─── Form Types ───
export interface ProductFormData {
    name: string;
    slug: string;
    description: string;
    price: number | null;
    price_formatted: string;
    category: string;
    in_stock: boolean;
    featured: boolean;
    display_order: number;
    benefits: string[];
    specs: Record<string, string>;
    whatsapp_message: string;
    image_thumbnail: string;
    image_carousel: string;
    image_gallery: string[];
    video_url: string;
}
