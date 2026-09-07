export type ProductCategory = 'Herramientas' | 'Kits' | 'Cintas y consumibles';

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  variants: string[];
  price: number;
  image: string;
  tone: 'coral' | 'sage' | 'ochre' | 'cream';
  badge?: string;
};

export const categories = ['Todo', 'Herramientas', 'Kits', 'Cintas y consumibles'] as const;
export type CategoryFilter = (typeof categories)[number];

export const products: Product[] = [
  {
    id: 'cortauñas',
    name: 'Cortauñas',
    description: 'Corte limpio y cómodo para cada rutina.',
    category: 'Herramientas',
    variants: ['Bebé', 'Chico', 'Grande', 'Punta de alicata'],
    price: 18,
    image: 'https://images.pexels.com/photos/7755458/pexels-photo-7755458.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'coral',
    badge: 'Los más pedidos',
  },
  {
    id: 'alicatas',
    name: 'Alicatas',
    description: 'Precisión firme para manos expertas.',
    category: 'Herramientas',
    variants: ['Pie', 'Manos'],
    price: 46,
    image: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'sage',
  },
  {
    id: 'alicata-verde',
    name: 'Alicata verde',
    description: 'La favorita del mostrador, resistente y ligera.',
    category: 'Herramientas',
    variants: ['Única'],
    price: 52,
    image: 'https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'sage',
    badge: 'Favorita',
  },
  {
    id: 'kit-manicure',
    name: 'Kit manicure',
    description: 'Todo lo básico para manos bien cuidadas.',
    category: 'Kits',
    variants: ['Kit completo'],
    price: 89,
    image: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'ochre',
    badge: 'Ahorra 10%',
  },
  {
    id: 'kit-pedicura',
    name: 'Kit pedicura',
    description: 'Un apapacho completo para pies cansados.',
    category: 'Kits',
    variants: ['Kit completo'],
    price: 112,
    image: 'https://images.pexels.com/photos/7755268/pexels-photo-7755268.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'cream',
  },
  {
    id: 'bisturis',
    name: 'Bisturís',
    description: 'Herramienta precisa para trabajos delicados.',
    category: 'Herramientas',
    variants: ['No. 3', 'No. 4'],
    price: 24,
    image: 'https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'coral',
  },
  {
    id: 'cinta-micropore',
    name: 'Cinta micropore',
    description: 'Suave con la piel, segura en cada aplicación.',
    category: 'Cintas y consumibles',
    variants: ['Chica', 'Grande'],
    price: 28,
    image: 'https://images.pexels.com/photos/7089625/pexels-photo-7089625.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'cream',
  },
  {
    id: 'tela-adhesiva',
    name: 'Tela adhesiva',
    description: 'El rollo práctico que siempre hace falta.',
    category: 'Cintas y consumibles',
    variants: ['Chica', 'Grande'],
    price: 34,
    image: 'https://images.pexels.com/photos/7088531/pexels-photo-7088531.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'ochre',
  },
  {
    id: 'transpore',
    name: 'Transpore',
    description: 'Transparente, resistente y fácil de cortar.',
    category: 'Cintas y consumibles',
    variants: ['Chico', 'Grande'],
    price: 31,
    image: 'https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'sage',
  },
];