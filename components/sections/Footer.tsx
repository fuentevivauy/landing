import { MapPin, Phone, Clock, Mail, Instagram, Facebook } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-blue text-off-white py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-stone-gray flex-shrink-0 mt-0.5" />
                                <span className="text-off-white/70">
                                    El Pinar, Ciudad de la Costa<br />
                                    <span className="text-sm">(Solo retiro, no visitas)</span>
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-stone-gray flex-shrink-0" />
                                <a
                                    href="https://wa.me/59894713998"
                                    className="text-off-white/70 hover:text-off-white transition-colors"
                                >
                                    +598 94 713 998
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-stone-gray flex-shrink-0" />
                                <span className="text-off-white/70">
                                    Lun - Sáb: 9:00 - 18:00
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Enlaces</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#catalogo"
                                    className="text-off-white/70 hover:text-off-white transition-colors"
                                >
                                    Catálogo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#faq"
                                    className="text-off-white/70 hover:text-off-white transition-colors"
                                >
                                    Preguntas Frecuentes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/59894713998"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-off-white/70 hover:text-off-white transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center gap-6 mb-8">
                    <a
                        href="https://www.instagram.com/fuenteviva_uy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all text-white"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.facebook.com/profile.php?id=61582434964463&mibextid=wwXIfr&rdid=EmcK24k4yI3kiVBO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1PV8WcaDum%2F%3Fmibextid%3DwwXIfr#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all text-white"
                        aria-label="Facebook"
                    >
                        <Facebook className="w-6 h-6" />
                    </a>
                </div>

                {/* Divider */}
                <div className="border-t border-off-white/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-off-white/50 text-sm">
                            © {currentYear} Fuente Viva. Todos los derechos reservados.
                        </p>
                        <p className="text-off-white/50 text-sm">
                            Hecho con ♥ en Uruguay
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
