import { getProductIdFromUrl } from '../../utils/Id';
import { ProductButtonTop } from './Button';

window.addEventListener('DOMContentLoaded', () => {
  const buttonTop =
    document.querySelector<ProductButtonTop>('product-button-top');

  // URL 쿼리스트링에서 제품 ID 가져오기
  const productIdStr = getProductIdFromUrl();
  const productId = productIdStr ? Number(productIdStr) : null;

  // 상품 ID가 존재할 경우 버튼 컴포넌트에 전달
  if (buttonTop && productId) {
    buttonTop.setProductId(productId);
  }
});
