import { ArrowLeft, Check, CreditCard, Landmark, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { type CartItem } from '@/store/cart-store';

type CheckoutSectionProps = {
  items: CartItem[];
  subtotal: number;
  onBack: () => void;
};

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, 'Escribe tu nombre completo.'),
    phone: z.string().min(10, 'Escribe un teléfono válido.'),
    email: z.string().email('Escribe un correo válido.'),
    paymentMethod: z.enum(['card', 'transfer']),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
  })
  .superRefine((values, context) => {
    if (values.paymentMethod !== 'card') return;
    if (!values.cardNumber || values.cardNumber.replace(/\s/g, '').length < 16) {
      context.addIssue({ code: 'custom', path: ['cardNumber'], message: 'Escribe los 16 dígitos de tu tarjeta.' });
    }
    if (!values.expiry || !/^\d{2}\/\d{2}$/.test(values.expiry)) {
      context.addIssue({ code: 'custom', path: ['expiry'], message: 'Usa el formato MM/AA.' });
    }
    if (!values.cvc || !/^\d{3,4}$/.test(values.cvc)) {
      context.addIssue({ code: 'custom', path: ['cvc'], message: 'Escribe el código de seguridad.' });
    }
  });

type CheckoutValues = z.infer<typeof checkoutSchema>;

const money = (value: number) => `$${value.toFixed(2)}`;

export function CheckoutSection({ items, subtotal, onBack }: CheckoutSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      paymentMethod: 'transfer',
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
  });
  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-7 py-10 text-center" data-testid="checkout-success">
        <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#dce7dc] text-[#2c8060]">
          <Check size={28} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#2c8060]">Recibimos tu solicitud</p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-[#183630]">Ya casi está tu pedido.</h3>
        <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-[#778078]">
          Te contactaremos para confirmar el envío y compartir los datos finales de pago.
        </p>
        <button onClick={onBack} className="mt-7 rounded-xl bg-[#183630] px-5 py-3 text-sm font-bold text-[#fff9f0]" data-testid="button-back-to-cart">
          Volver al carrito
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-testid="checkout-section">
      <div className="flex items-center gap-3 border-b border-[#ded9cc] px-6 py-5">
        <button onClick={onBack} className="rounded-full p-2 text-[#183630] transition-colors hover:bg-[#ece5d7]" aria-label="Volver al carrito" data-testid="button-back-checkout">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#ef6946]">Último paso</p>
          <h2 className="font-display text-3xl font-semibold text-[#183630]">Finaliza tu compra</h2>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        <div className="mb-5 rounded-2xl bg-[#f5f1e8] p-4" data-testid="checkout-order-summary">
          <div className="flex items-center justify-between text-sm text-[#778078]">
            <span>{items.reduce((total, item) => total + item.quantity, 0)} artículos</span>
            <strong className="text-lg text-[#183630]" data-testid="text-checkout-subtotal">{money(subtotal)}</strong>
          </div>
          <p className="mt-1 text-xs text-[#8b9286]">El envío se confirma contigo por WhatsApp.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="checkout-form">
            <div>
              <p className="mb-3 text-sm font-bold text-[#183630]">Tus datos</p>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-[#657268]">Nombre completo</FormLabel>
                      <FormControl>
                        <input {...field} placeholder="Tu nombre" className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] px-3 text-sm text-[#183630] outline-none focus:border-[#ef6946]" data-testid="input-checkout-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-[#657268]">Teléfono</FormLabel>
                        <FormControl>
                          <input {...field} type="tel" placeholder="10 dígitos" className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] px-3 text-sm text-[#183630] outline-none focus:border-[#ef6946]" data-testid="input-checkout-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-[#657268]">Correo</FormLabel>
                        <FormControl>
                          <input {...field} type="email" placeholder="tu@correo.com" className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] px-3 text-sm text-[#183630] outline-none focus:border-[#ef6946]" data-testid="input-checkout-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-[#183630]">Elige cómo pagar</p>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid gap-3">
                        <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${field.value === 'card' ? 'border-[#ef6946] bg-[#fff2ec]' : 'border-[#d9d4c7] bg-[#fbf9f4]'}`} data-testid="option-payment-card">
                          <input {...field} type="radio" value="card" checked={field.value === 'card'} className="mt-1 accent-[#ef6946]" data-testid="radio-payment-card" />
                          <CreditCard size={19} className="mt-0.5 text-[#ef6946]" />
                          <span><span className="block text-sm font-bold text-[#183630]">Tarjeta de crédito o débito</span><span className="mt-1 block text-xs leading-relaxed text-[#778078]">Pago seguro con la plataforma que conectemos.</span></span>
                        </label>
                        <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${field.value === 'transfer' ? 'border-[#2c8060] bg-[#edf4ec]' : 'border-[#d9d4c7] bg-[#fbf9f4]'}`} data-testid="option-payment-transfer">
                          <input {...field} type="radio" value="transfer" checked={field.value === 'transfer'} className="mt-1 accent-[#2c8060]" data-testid="radio-payment-transfer" />
                          <Landmark size={19} className="mt-0.5 text-[#2c8060]" />
                          <span><span className="block text-sm font-bold text-[#183630]">Transferencia bancaria</span><span className="mt-1 block text-xs leading-relaxed text-[#778078]">Te compartimos los datos al confirmar tu pedido.</span></span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {paymentMethod === 'card' && (
              <div className="rounded-2xl border border-[#f3c8b8] bg-[#fff8f3] p-4" data-testid="card-payment-fields">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#183630]"><LockKeyhole size={14} className="text-[#2c8060]" /> Datos protegidos al conectar el proveedor de pago</div>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-[#657268]">Número de tarjeta</FormLabel>
                        <FormControl>
                          <input {...field} inputMode="numeric" placeholder="0000 0000 0000 0000" className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] px-3 text-sm tracking-wider text-[#183630] outline-none focus:border-[#ef6946]" data-testid="input-card-number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#657268]">Vencimiento</FormLabel>
                          <FormControl>
                            <input {...field} placeholder="MM/AA" className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] px-3 text-sm text-[#183630] outline-none focus:border-[#ef6946]" data-testid="input-card-expiry" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#657268]">CVC</FormLabel>
                          <FormControl>
                            <input {...field} type="password" inputMode="numeric" placeholder="000" className="h-11 w-full rounded-xl border border-[#d9d4c7] bg-[#fbf9f4] px-3 text-sm text-[#183630] outline-none focus:border-[#ef6946]" data-testid="input-card-cvc" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="rounded-2xl border border-[#cfe0cf] bg-[#edf4ec] p-4 text-xs leading-relaxed text-[#52695a]" data-testid="transfer-payment-note">
                Al elegir transferencia, revisaremos tu pedido y te enviaremos la cuenta bancaria junto con la referencia exacta por WhatsApp.
              </div>
            )}

            <p className="text-xs leading-relaxed text-[#8b9286]">
              En esta primera versión el pedido se registra para confirmarlo contigo. El cobro real se activará al conectar el proveedor de pagos.
            </p>
            <button type="submit" className="w-full rounded-xl bg-[#ef6946] py-3.5 text-sm font-bold text-[#fff9f0] transition-colors hover:bg-[#df5636]" data-testid="button-submit-checkout">
              Confirmar pedido
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}