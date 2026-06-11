const DEFAULT_R2_PUBLIC_URL = 'https://pub-ca2ecc1cb4254361b44aa79f5e034cd2.r2.dev';
const r2PublicUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || DEFAULT_R2_PUBLIC_URL).replace(/\/+$/, '');

export function publicAssetUrl(objectKey: string): string {
    return `${r2PublicUrl}/${objectKey.replace(/^\/+/, '')}`;
}

export const PUBLIC_ASSETS = {
    heroVideo: publicAssetUrl('hero/hero-video.mp4'),
    heroFallback: publicAssetUrl('hero/hero-fountain-new.jpg'),
    finalCtaMobile: publicAssetUrl('static/final-cta-mobile-birds.jpg'),
    finalCtaDesktop: publicAssetUrl('static/final-cta-desktop-birds.png'),
};
