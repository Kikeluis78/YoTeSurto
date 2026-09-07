import { ArrowDownRight, ArrowRight, Check, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CategoryFilter } from '@/components/category-filter';
import { CartDrawer } from '@/components/cart-drawer';
import { FloatingWhatsApp } from '@/components/floating-whatsapp';
import { ProductCard } from '@/components/product-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { type CategoryFilter as CategoryFilterType, products } from '@/data/products';

export default function Home() {
  const [category, setCategory] = useState<CategoryFilterType>('Todo');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'Todo' || product.category === category;
      const searchable = [product.name, product.description, product.category, ...product.variants].join(' ').toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [category, search]);

  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden bg-[#f8f5ee]">
      <div className="bg-[#f2c763] px-4 py-2 text-center text-[11px] font-bold tracking-[.08em] text-[#183630]" data-testid="announcement-bar">SURTIMOS TU NEGOCIO · ENVÍOS A TODO MÉXICO</div>
      <SiteHeader onCartOpen={() => setCartOpen(true)} />
      <main>
        <section className="hero-grid relative overflow-hidden border-b border-[#ded9cc]" data-testid="hero-section">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[1.04fr_.96fr] lg:px-10">
            <div className="relative z-10 max-w-[640px]">
              <p className="rise-in mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#ef6946]"><span className="h-2 w-2 rounded-full bg-[#ef6946]" /> Surtido con cariño desde México</p>
              <h1 className="rise-in delay-1 text-balance font-display text-[clamp(3.4rem,8vw,7.6rem)] font-semibold leading-[.91] tracking-[-.07em] text-[#183630]" data-testid="text-hero-title">Lo que tu cuidado <em className="font-normal text-[#ef6946]">necesita.</em></h1>
              <p className="rise-in delay-2 mt-7 max-w-[490px] text-base leading-7 text-[#657268] md:text-lg">Herramientas e insumos confiables para manicure, pedicure y ese pequeño ritual de sentirte bien. Sin vueltas, sin compras de más.</p>
              <div className="rise-in delay-3 mt-8 flex flex-wrap items-center gap-4">
                <a href="#catalogo" className="group flex items-center gap-3 rounded-xl bg-[#183630] px-5 py-3.5 text-sm font-bold text-[#fff9f0] shadow-[4px_4px_0_#ef6946] transition-transform hover:-translate-y-0.5" data-testid="link-hero-catalog">Explorar catálogo <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
                <a href="#nuestra-forma" className="flex items-center gap-2 rounded-xl px-2 py-3 text-sm font-bold text-[#183630] underline decoration-[#f2c763] decoration-4 underline-offset-4" data-testid="link-hero-story">Conoce nuestra forma <ArrowDownRight size={16} /></a>
              </div>
              <div className="rise-in delay-4 mt-10 flex items-center gap-6 border-t border-[#d9d4c7] pt-5 text-xs font-semibold text-[#778078]"><span className="flex items-center gap-2"><Check size={15} className="text-[#2c8060]" /> Precios claros</span><span className="flex items-center gap-2"><Check size={15} className="text-[#2c8060]" /> Atención cercana</span></div>
            </div>
            <div className="relative mx-auto h-[430px] w-full max-w-[540px] lg:h-[560px]" data-testid="hero-visual">
              <div className="absolute right-[6%] top-[4%] h-[76%] w-[73%] rotate-[4deg] rounded-[46%_46%_42%_42%] bg-[#dce7dc]" />
              <div className="absolute bottom-[4%] left-[3%] h-[46%] w-[48%] rounded-[42%_58%_46%_54%] bg-[#f1e3bd]" />
              <div className="absolute right-[7%] top-[12%] h-[72%] w-[72%] overflow-hidden rounded-[42%_42%_40%_40%] border-[10px] border-[#fff9f0] shadow-[0_20px_40px_rgba(24,54,48,.15)]">
                <img src="https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Herramientas para cuidado personal" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-[14%] left-[2%] z-10 max-w-[185px] rotate-[-6deg] rounded-2xl bg-[#ef6946] p-4 text-[#fff9f0] shadow-[5px_5px_0_#183630]"><Sparkles size={18} /><p className="mt-3 font-display text-xl leading-tight">Pequeños básicos, grandes rutinas.</p></div>
              <div className="absolute right-0 top-[7%] z-10 rounded-full bg-[#f2c763] px-3 py-2 text-[10px] font-bold uppercase tracking-[.1em] text-[#183630] shadow-[2px_2px_0_#183630]">Hecho para volver</div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 lg:px-10 lg:py-24" data-testid="catalog-section">
          <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#ef6946]">El surtido</p><h2 className="font-display text-4xl font-semibold tracking-[-.04em] text-[#183630] md:text-5xl">Básicos que sí resuelven.</h2><p className="mt-3 max-w-[510px] text-sm leading-relaxed text-[#778078]">Para tu mesa de trabajo, tu negocio o tu ratito de autocuidado. Elige una familia y encuentra justo lo que buscas.</p></div>
            <div className="relative w-full md:max-w-[270px]"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#849087]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar en el surtido..." className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] pl-10 pr-4 text-sm text-[#183630] outline-none transition-colors placeholder:text-[#a5aba1] focus:border-[#ef6946]" data-testid="input-product-search" /></div>
          </div>
          <CategoryFilter value={category} onChange={setCategory} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="product-grid">
            {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
          {filteredProducts.length === 0 && <div className="rounded-2xl border border-dashed border-[#cfc8b8] bg-[#f4f0e6] px-6 py-16 text-center" data-testid="empty-product-results"><p className="font-display text-2xl font-semibold text-[#183630]">No encontramos ese básico.</p><p className="mt-2 text-sm text-[#778078]">Prueba con otra palabra o mira todo el surtido.</p><button onClick={() => { setSearch(''); setCategory('Todo'); }} className="mt-5 rounded-xl bg-[#183630] px-4 py-2.5 text-sm font-bold text-[#fff9f0]" data-testid="button-clear-filters">Limpiar filtros</button></div>}
        </section>

        <section id="nuestra-forma" className="scroll-mt-24 bg-[#e7eee4] px-5 py-16 lg:px-10 lg:py-24" data-testid="story-section">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[#2c8060]">Nuestra forma</p><h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.04em] text-[#183630] md:text-6xl">Comprar sencillo también se siente bien.</h2><p className="mt-5 max-w-[400px] text-sm leading-7 text-[#657268]">YoTeSurto nació para hacer más fácil conseguir esos productos que se acaban justo cuando más los necesitas. Somos prácticos porque conocemos el mostrador.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[18px] bg-[#fff9f0] p-5 sm:translate-y-8"><div className="mb-8 grid h-10 w-10 place-items-center rounded-xl bg-[#f2c763] text-[#183630]"><ShieldCheck size={20} /></div><h3 className="font-display text-xl font-semibold text-[#183630]">Bien elegido</h3><p className="mt-2 text-xs leading-relaxed text-[#778078]">Solo lo que usarías en tu rutina de verdad.</p></div>
              <div className="rounded-[18px] bg-[#183630] p-5 text-[#fff9f0]"><div className="mb-8 grid h-10 w-10 place-items-center rounded-xl bg-[#ef6946]"><Truck size={20} /></div><h3 className="font-display text-xl font-semibold">Listo para salir</h3><p className="mt-2 text-xs leading-relaxed text-[#b9c7bc]">Armamos tus básicos con cuidado y claridad.</p></div>
              <div className="rounded-[18px] bg-[#ef6946] p-5 text-[#fff9f0] sm:translate-y-4"><div className="mb-8 grid h-10 w-10 place-items-center rounded-xl bg-[#fff9f0] text-[#ef6946]"><Sparkles size={20} /></div><h3 className="font-display text-xl font-semibold">Para volver</h3><p className="mt-2 text-xs leading-relaxed text-[#ffe2d5]">Un surtido confiable que se vuelve costumbre.</p></div>
            </div>
          </div>
        </section>
        <section className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center lg:px-10" data-testid="closing-cta">
          <div><p className="font-display text-3xl font-semibold text-[#183630]">¿Lista para surtir tu mesa?</p><p className="mt-1 text-sm text-[#778078]">Empieza por lo de siempre. Quédate por lo bien atendida.</p></div>
          <a href="#catalogo" className="flex items-center gap-2 rounded-xl bg-[#f2c763] px-5 py-3 text-sm font-bold text-[#183630] transition-transform hover:-translate-y-0.5" data-testid="link-closing-catalog">Ver productos <ArrowRight size={16} /></a>
        </section>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}