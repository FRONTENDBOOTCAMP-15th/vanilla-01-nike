import { getAxios } from '../utils/Axois';

// 상품 목록을 가져오기 위한 API
export async function getProducts() {
  const instance = getAxios();
  const response = await instance.get('/products');
  return response.data;
}
