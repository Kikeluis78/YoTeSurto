import { SlidersHorizontal } from 'lucide-react';
import type { CategoryFilter } from '@/data/products';
import { categories } from '@/data/products';

type CategoryFilterProps = { value: CategoryFilter; onChange: (value: CategoryFilter) => void };

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2" data-testid="category-filter">
      <SlidersHorizontal size={17} className="mr-1 shrink-0 text-[#8b9286]" />
      {categories.map((category) => (
        <button key={category} onClick={() => onChange(category)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${value === category ? 'border-[#183630] bg-[#183630] text-[#fff9f0]' : 'border-[#d9d4c7] bg-[#fbf9f4] text-[#5e6a62] hover:border-[#183630] hover:text-[#183630]'}`} data-testid={`button-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>
          {category}
        </button>
      ))}
    </div>
  );
}