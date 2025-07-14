import api from './api';
import type { Product } from '../types/Product';
import { getProducts } from './productService';


export const fetchByName = async (nome: string): Promise<Product[]> => {
  const res = await api.get<Product[]>(`recursos?nome=${encodeURIComponent(nome)}`);
  return res.data;
};

/* Função apropriada a se usar para buscar produtos por categoria */
// export const fetchByCategory = async (categoria: string): Promise<Product[]> => {
//   const res = await api.get<Product[]>(`recursos?categoria=${encodeURIComponent(categoria)}`);
//   return res.data;
// };

// Função adaptada para buscar produtos por categoria por limitações da MockAPI
export const fetchByCategory = async (categoria: string): Promise<Product[]> => {
  const res = await getProducts();
  return res.data.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
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
