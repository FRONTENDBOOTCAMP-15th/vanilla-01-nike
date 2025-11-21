import { getAxios } from './axios.ts';
import type { Products } from '../types/Products';
import { getProductIdFromUrl } from './Id';

export async function fetchProductDetail(id: string): Promise<Products> {
  const axios = getAxios();
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export async function fetchProductDetailByUrl(): Promise<Products | null> {
  const id = getProductIdFromUrl();
  if (!id) return null;
  return fetchProductDetail(id);
}
