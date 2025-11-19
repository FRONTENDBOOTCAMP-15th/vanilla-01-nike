import type { Products } from '../../types/Products';
import { fetchProductDetailByUrl } from '../../utils/productService';

class SizeSelector extends HTMLElement {
  product: Products | null = null;

  async connectedCallback() {
    // 쿼리 스트링에서 실제 제품 ID 가져오기
    try {
      const data = await fetchProductDetailByUrl();
      if (!data) {
        console.error('제품 ID가 없거나 데이터를 불러올 수 없습니다.');
        return;
      }

      this.product = data;
      console.log('받아온 제품 데이터:', this.product);
      this.render();
      this.applyData();
    } catch (e) {
      console.error('상품 정보를 불러오지 못했습니다:', e);
    }
  }

  render() {
    this.innerHTML = `
    <div class="w-[312px] mx-6 mb-8">
      <div class="flex justify-between items-center mb-2">
        <p class="">사이즈 선택</p>
        <p class="text-gray-600">사이즈 가이드</p>
      </div>
      <div class="flex flex-wrap justify-center gap-1.75 mt-2.25">
        <button
          type="button"
          aria-labelledby="sizeButton"
          class="py-2.5 px-3.5 border cursor-pointer rounded-sm"
          id="p-size"
        >
          250
        </button>
      </div>
    </div>
  `;
  }

  applyData() {
    if (!this.product) return;

    const p = this.product.item;

    // 사이즈 정보
    const sizes = p.extra?.size ?? [];
    this.querySelector('#p-size')!.textContent = sizes.join(', ');
  }
}

customElements.define('size-selector', SizeSelector);
