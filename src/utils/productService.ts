import { getAxios } from './axios';
import type { Products, Product } from '../types/Products';
import { getProductIdFromUrl } from './Id';

// 해당 ID를 가진 제품 상세 정보를 가져오는 함수
export async function fetchProductDetail(id: string): Promise<Products> {
  const axios = getAxios();
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

// URL의 쿼리 파라미터에서 _id를 가져와 해당 상품 정보를 가져오는 함수
export async function fetchProductDetailByUrl(): Promise<Products | null> {
  const id = getProductIdFromUrl();
  if (!id) return null;
  return fetchProductDetail(id);
}

// 특정 카테고리에 속한 상품 목록을 가져오는 함수
export async function fetchProductsByCategory(
  categoryCode: string,
): Promise<Product[]> {
  if (!categoryCode) return [];
  const axios = getAxios();
  const res = await axios.get(`/products?category=${categoryCode}`);

  return res.data.item ?? [];
}
