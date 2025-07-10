import api from './api';
import type { Product } from '../types/Product';

const resource = 'recursos';

export const getProducts = () => api.get<Product[]>(resource);
export const getProductById = (id: string) => api.get<Product>(`${resource}/${id}`);
export const createProduct = (data: Omit<Product, 'id'>) => api.post<Product>(resource, data);
export const updateProduct = (id: string, data: Omit<Product, 'id'>) => api.put<Product>(`${resource}/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`${resource}/${id}`);
