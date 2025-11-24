import { getProducts } from '../../apis/itemListApi';

export type Product = {
  _id?: string | number;
  id?: string | number;
  name: string;
  price: number;
  mainImages?: { path: string; name: string }[];
  extra?: {
    isNew?: boolean;
    isBest?: boolean;
    category?: string[];
    color?: string;
    gender?: string;
    primeCost: number;
    size?: Array<number | string> | number | string;
  };
};

export type SortOption = 'recommended' | 'new' | 'low' | 'high';

// API에서 데이터를 받아와 항상 동일한 상품 배열 형태로 맞춤.
export const fetchProducts = async (): Promise<Product[]> => {
  const data = await getProducts();
  const normalize = (list: Product[]) =>
    list.map(product => ({
      ...product,
      id: product.id ?? product._id,
    }));

  if (Array.isArray(data)) {
    return normalize(data as Product[]);
  }
  if (Array.isArray(data?.item)) {
    return normalize(data.item as Product[]);
  }

  return [];
};

// 네비게이션 바 클릭 시 상품 반환
export const filterByCategory = (products: Product[], key: string) => {
  const normalizedKey = key?.trim();
  if (!normalizedKey) {
    return [...products];
  }

  if (normalizedKey === '신발') {
    return products.filter(product =>
      Array.isArray(product.extra?.size)
        ? product.extra?.size.some(
            (value: number | string) => typeof value === 'number',
          )
        : product.extra?.size === undefined ||
          typeof product.extra?.size === 'number',
    );
  }

  if (normalizedKey === '재킷 & 베스트') {
    return products.filter(product =>
      Array.isArray(product.extra?.size)
        ? product.extra?.size.some(
            (value: number | string) => typeof value === 'string',
          )
        : typeof product.extra?.size === 'string',
    );
  }

  return products.filter(product => {
    const categories = product.extra?.category ?? [];
    return categories.some(category =>
      category.toLowerCase().includes(normalizedKey.toLowerCase()),
    );
  });
};

// 필터 정렬 기준에 맞춰 새 배열 반환
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
