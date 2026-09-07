import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { useCartStore } from '@/store/cart-store';

type SiteHeaderProps = { onCartOpen: () => void };

export function SiteHeader({ onCartOpen }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-[#ded9cc] bg-[#f8f5ee]/95 backdrop-blur-md" data-testid="site-header">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-10">
        <button className="mr-3 rounded-full p-2 text-[#183630] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú" data-testid="button-open-menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link href="/" className="group flex items-center gap-2" data-testid="link-logo">
          <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#ef6946] font-display text-2xl text-[#fff9f0] shadow-[3px_3px_0_#183630]">Y</span>
          <span className="font-display text-[25px] font-semibold tracking-[-.04em] text-[#183630]">YoTeSurto</span>
        </Link>
        <nav className={`${menuOpen ? 'absolute left-0 right-0 top-[76px] flex' : 'hidden'} flex-col gap-1 border-b border-[#ded9cc] bg-[#f8f5ee] p-5 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`} data-testid="nav-main">
          <a href="#catalogo" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#183630] transition-colors hover:bg-[#ece5d7]" data-testid="link-catalogo">Catálogo</a>
          <a href="#nuestra-forma" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#183630] transition-colors hover:bg-[#ece5d7]" data-testid="link-nuestra-forma">Nuestra forma</a>
          <a href="#ayuda" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#183630] transition-colors hover:bg-[#ece5d7]" data-testid="link-ayuda">Ayuda</a>
        </nav>
        <div className="flex items-center gap-1 sm:gap-3">
          <button onClick={() => { const searchInput = document.getElementById('input-product-search'); searchInput?.scrollIntoView({ behavior: 'smooth', block: 'center' }); searchInput?.focus(); }} className="hidden rounded-full p-2.5 text-[#183630] transition-colors hover:bg-[#ece5d7] sm:block" aria-label="Buscar productos" data-testid="button-search"><Search size={20} strokeWidth={1.8} /></button>
          <button onClick={onCartOpen} className="relative rounded-full bg-[#183630] p-3 text-[#fff9f0] transition-transform hover:scale-105" aria-label="Abrir carrito" data-testid="button-cart">
            <ShoppingBag size={20} strokeWidth={1.8} />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef6946] px-1 text-[10px] font-bold text-white" data-testid="text-cart-count">{itemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}