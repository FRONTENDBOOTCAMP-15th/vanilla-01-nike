import { getProducts } from '../../apis/itemListApi';

export type SortOption = 'recommended' | 'new' | 'low' | 'high';

export type Product = {
  id?: string | number;
  name: string;
  price: number;
  mainImages?: { path: string; name: string }[];
  extra?: {
    isNew?: boolean;
    category?: string[];
    color?: string;
  };
};

// API에서 데이터를 받아와 항상 동일한 상품 배열 형태로 맞춤.
export const fetchProducts = async (): Promise<Product[]> => {
  const data = await getProducts();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.item)) return data.item;
  return [];
};

// 정렬 기준에 맞춰 새 배열 반환
export const sortProducts = (list: Product[], option: SortOption) => {
  const sorted = [...list];
  if (!sorted.length) return sorted;

  if (option === 'recommended') {
    sorted.sort(
      (a, b) => Number(a.extra?.isNew || 0) - Number(b.extra?.isNew || 0),
    );
  } else if (option === 'new') {
    sorted.sort(
      (a, b) => Number(b.extra?.isNew || 0) - Number(a.extra?.isNew || 0),
    );
  } else if (option === 'low') {
    sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (option === 'high') {
    sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  }

  return sorted;
};

// 네비게이션 바 클릭 시 상품 반환
export const filterByCategory = (products: Product[], key: string) => {
  const normalizedKey = key?.trim();
  if (!normalizedKey || normalizedKey === '신발') {
    return [...products];
  }

  // 초기 탭에서는 필터 적용하지 않음.
  return products.filter(product => {
    const categories = product.extra?.category ?? [];
    return categories.some(category =>
      category.toLowerCase().includes(normalizedKey.toLowerCase()),
    );
  });
};
