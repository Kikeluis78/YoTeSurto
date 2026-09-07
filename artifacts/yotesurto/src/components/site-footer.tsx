import { Instagram, MessageCircle } from 'lucide-react';
import { RiTelegram2Line } from 'react-icons/ri';

export function SiteFooter() {
  return (
    <footer id="ayuda" className="bg-[#183630] px-5 py-12 text-[#fff9f0] lg:px-10" data-testid="site-footer">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div><div className="mb-4 flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#ef6946] font-display text-xl text-[#fff9f0]">Y</span><span className="font-display text-2xl font-semibold">YoTeSurto</span></div><p className="max-w-[300px] text-sm leading-relaxed text-[#b9c7bc]">Insumos sencillos, trato cercano y la tranquilidad de saber que te surtimos bien.</p></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#f2c763]">Atajos</p><div className="space-y-2 text-sm text-[#d5ded3]"><a href="#catalogo" className="block hover:text-[#f2c763]">Ver catálogo</a><a href="#nuestra-forma" className="block hover:text-[#f2c763]">Nuestra forma</a><a href="#catalogo" className="block hover:text-[#f2c763]">Kits para empezar</a></div></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#f2c763]">Platiquemos</p><p className="mb-4 max-w-[230px] text-sm leading-relaxed text-[#b9c7bc]">¿No encuentras algo? Escríbenos y lo buscamos contigo.</p><div className="flex gap-2"><a href="https://instagram.com" className="rounded-full border border-[#49685c] p-2.5 hover:bg-[#2c5548]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={17} /></a><a href="https://wa.me/525611001627" className="rounded-full border border-[#49685c] p-2.5 hover:bg-[#2c5548]" aria-label="WhatsApp" data-testid="link-whatsapp"><MessageCircle size={17} /></a><a href="https://t.me/+525611001627" target="_blank" rel="noreferrer" className="rounded-full border border-[#49685c] p-2.5 hover:bg-[#2c5548]" aria-label="Telegram" data-testid="link-telegram"><RiTelegram2Line size={18} /></a></div></div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-[#35564b] pt-5 text-xs text-[#8da398]">© 2024 YoTeSurto · Hecho para surtir lo que sí necesitas.</div>
    </footer>
  );
}