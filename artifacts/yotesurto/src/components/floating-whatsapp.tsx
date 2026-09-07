import { MessageCircle } from 'lucide-react';

const whatsappMessage = encodeURIComponent('Necesitas ayuda con tu pedido.');
const whatsappUrl = `https://wa.me/525611001627?text=${whatsappMessage}`;

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,211,102,.3)] transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#183630] focus:ring-offset-2"
      aria-label="Necesitas ayuda con tu pedido"
      data-testid="floating-whatsapp"
    >
      <MessageCircle size={20} fill="currentColor" />
      <span className="hidden sm:inline">¿Necesitas ayuda?</span>
    </a>
  );
}