export const QUOTE_REQUIRED_TEXT = 'Requiere cotización';

export function hasProductPrice(price: number | null): price is number {
    return typeof price === 'number' && Number.isFinite(price) && price > 0;
}

export function formatProductPrice(price: number | null): string {
    return hasProductPrice(price)
        ? `$${price.toLocaleString('es-UY')}`
        : QUOTE_REQUIRED_TEXT;
}
