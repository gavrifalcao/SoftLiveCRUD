import api from './api';
import type { Product } from '../types/Product';

export const fetchByName = async (nome: string): Promise<Product[]> => {
  const res = await api.get<Product[]>(`recursos?nome=${encodeURIComponent(nome)}`);
  return res.data;
};

export const fetchByCategory = async (categoria: string): Promise<Product[]> => {
  const res = await api.get<Product[]>(`recursos?categoria=${encodeURIComponent(categoria)}`);
  return res.data;
};

export const filterByPrice = (products: Product[], max: number): Product[] => {
  return products.filter((p) => p.preco <= max);
};

export const filterByPriceRange = (
  products: Product[],
  min: number,
  max: number
): Product[] => {
  return products.filter((p) => p.preco >= min && p.preco <= max);
};

export const clearFilters = () => ({
  searchType: 'nome' as const,
  searchValue: '',
  searchRange: { min: '', max: '' },
});
