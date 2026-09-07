import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { CheckoutSection } from '@/components/checkout-section';
import { useCartStore } from '@/store/cart-store';

type CartDrawerProps = { open: boolean; onClose: () => void };

const money = (value: number) => `$${value.toFixed(2)}`;

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito de compras" data-testid="cart-drawer">
      <button className="absolute inset-0 cursor-default bg-[#183630]/35 backdrop-blur-[2px]" onClick={onClose} aria-label="Cerrar carrito" data-testid="button-close-cart-overlay" />
      <aside className="drawer-enter absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-[#fbf9f4] shadow-[-16px_0_40px_rgba(24,54,48,.14)]">
        {!checkoutOpen && <div className="flex items-center justify-between border-b border-[#ded9cc] px-6 py-5">
          <div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#ef6946]">Tu selección</p><h2 className="font-display text-3xl font-semibold text-[#183630]">Carrito</h2></div>
          <button onClick={onClose} className="rounded-full p-2 text-[#183630] transition-colors hover:bg-[#ece5d7]" aria-label="Cerrar carrito" data-testid="button-close-cart"><X size={22} /></button>
        </div>}
        {checkoutOpen ? (
          <CheckoutSection items={items} subtotal={subtotal} onBack={() => setCheckoutOpen(false)} />
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 grid h-20 w-20 place-items-center rounded-full bg-[#f1e3bd] text-[#183630]"><ShoppingBag size={31} strokeWidth={1.5} /></div>
            <h3 className="font-display text-2xl font-semibold text-[#183630]" data-testid="text-empty-cart">Tu carrito está esperando</h3>
            <p className="mt-2 max-w-[270px] text-sm leading-relaxed text-[#778078]">Agrega tus básicos de cuidado y aquí los guardamos por ti.</p>
            <button onClick={onClose} className="mt-7 rounded-xl bg-[#183630] px-5 py-3 text-sm font-bold text-[#fff9f0]" data-testid="button-continue-shopping">Seguir viendo productos</button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-2 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div className="flex gap-3 border-b border-[#ebe6dc] py-3 first:pt-0" key={item.lineId} data-testid={`cart-item-${item.lineId}`}>
                  <img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover mix-blend-multiply" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2"><p className="truncate text-sm font-bold text-[#183630]">{item.name}</p><span className="text-sm font-bold text-[#ef6946]">{money(item.price * item.quantity)}</span></div>
                    <p className="mt-0.5 text-xs text-[#8b9286]">{item.variant}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-lg border border-[#d9d4c7] bg-[#f5f1e8]">
                        <button onClick={() => updateQuantity(item.lineId, item.quantity - 1)} className="p-1.5 text-[#183630] hover:bg-[#eae4d8]" aria-label={`Reducir cantidad de ${item.name}`} data-testid={`button-decrease-${item.lineId}`}><Minus size={13} /></button>
                        <span className="min-w-7 text-center text-xs font-bold text-[#183630]" data-testid={`text-quantity-${item.lineId}`}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.lineId, item.quantity + 1)} className="p-1.5 text-[#183630] hover:bg-[#eae4d8]" aria-label={`Aumentar cantidad de ${item.name}`} data-testid={`button-increase-${item.lineId}`}><Plus size={13} /></button>
                      </div>
                      <button onClick={() => removeItem(item.lineId)} className="p-1.5 text-[#9b8b82] hover:text-[#ef6946]" aria-label={`Eliminar ${item.name}`} data-testid={`button-remove-${item.lineId}`}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#ded9cc] bg-[#f5f1e8] px-6 py-5">
              <div className="flex items-center justify-between text-sm text-[#778078]"><span>Subtotal</span><strong className="text-xl text-[#183630]" data-testid="text-cart-subtotal">{money(subtotal)}</strong></div>
              <p className="mt-2 text-xs text-[#8b9286]">Envío se calcula al confirmar tu pedido.</p>
              <button onClick={() => setCheckoutOpen(true)} className="mt-5 w-full rounded-xl bg-[#ef6946] py-3.5 text-sm font-bold text-[#fff9f0] transition-colors hover:bg-[#df5636]" data-testid="button-checkout">Continuar pedido</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}