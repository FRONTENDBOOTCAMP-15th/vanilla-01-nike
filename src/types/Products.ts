// 상품 전체 정보
export interface Products {
  item: {
    _id: number;
    seller_id: number;
    price: number;
    shippingFees: number;
    content: string;
    show: boolean;
    active: boolean;
    name: string;
    quantity: boolean;
    buyQuantity: boolean;
    mainImages: [
      {
        path: string;
        name: string;
      },
    ];
    createdAt: string;
    updatedAt: string;
    extra: {
      isNew: boolean;
      isBest: boolean;
      category: string[];
      sort: 1;
      gender: string;
      color: string;
      styleNo: string;
      size: string[];
    };
    replies: number;
    bookmarks: number;
    rating: number;
    myBookmarkId: number;
    options: number;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface Product {
  _id: number;
  seller_id: number;
  price: number;
  shippingFees: number;
  content: string;
  show: boolean;
  active: boolean;
  name: string;
  quantity: boolean;
  buyQuantity: boolean;
  mainImages: {
    path: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
  extra: {
    isNew: boolean;
    isBest: boolean;
    category: string[];
    sort: number;
    gender?: string;
    color?: string;
    styleNo?: string;
    size?: string[];
  };
  replies: number;
  bookmarks: number;
  rating?: number;
  myBookmarkId?: number;
  options?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
