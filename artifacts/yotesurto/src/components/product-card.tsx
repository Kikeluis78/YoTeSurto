import { Check, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { useCartStore } from '@/store/cart-store';

type ProductCardProps = { product: Product; index: number };

export function ProductCard({ product, index }: ProductCardProps) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toneClasses = {
    coral: 'bg-[#f6ddd2]',
    sage: 'bg-[#dce7dc]',
    ochre: 'bg-[#f1e3bd]',
    cream: 'bg-[#eee9de]',
  };

  const handleAdd = () => {
    addItem(product, variant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="product-card rise-in group relative flex flex-col overflow-hidden rounded-[20px] border border-[#ded9cc] bg-[#fbf9f4] opacity-0" style={{ animationDelay: `${index * 60}ms` }} data-testid={`card-product-${product.id}`}>
      <div className={`relative mx-3 mt-3 flex aspect-[1.18] items-center justify-center overflow-hidden rounded-[14px] ${toneClasses[product.tone]}`}>
        {product.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-[#fff9f0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-[#183630]" data-testid={`badge-product-${product.id}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} className="product-image h-[76%] w-[76%] object-cover mix-blend-multiply" loading="lazy" data-testid={`img-product-${product.id}`} />
        <span className="absolute bottom-3 right-3 rounded-full bg-[#fff9f0]/80 px-2 py-1 text-[10px] font-semibold text-[#657268]">{product.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-display text-[21px] font-semibold leading-tight text-[#183630]" data-testid={`text-product-name-${product.id}`}>{product.name}</h3>
          <span className="whitespace-nowrap text-base font-bold text-[#ef6946]" data-testid={`text-product-price-${product.id}`}>${product.price}.00</span>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-[#778078]">{product.description}</p>
        <div className="mt-auto space-y-3">
          {product.variants.length > 1 ? (
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[.1em] text-[#849087]">Presentación</span>
              <select value={variant} onChange={(event) => setVariant(event.target.value)} className="w-full rounded-xl border border-[#d9d4c7] bg-[#f5f1e8] px-3 py-2 text-sm font-semibold text-[#183630] outline-none focus:border-[#ef6946]" data-testid={`select-variant-${product.id}`}>
                {product.variants.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          ) : <div className="flex h-[38px] items-center gap-1 text-xs font-semibold text-[#849087]"><Star size={13} fill="currentColor" /> Presentación única</div>}
          <button onClick={handleAdd} className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${added ? 'bg-[#2c8060] text-white' : 'bg-[#ef6946] text-[#fff9f0] hover:bg-[#df5636] active:scale-[.98]'}`} data-testid={`button-add-${product.id}`}>
            {added ? <><Check size={16} /> Agregado</> : <><Plus size={17} /> Agregar al carrito</>}
          </button>
        </div>
      </div>
    </article>
  );
}