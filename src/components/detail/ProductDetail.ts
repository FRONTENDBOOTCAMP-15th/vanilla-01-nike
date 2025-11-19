import type { Products } from '../../types/Products';
import { fetchProductDetailByUrl } from '../../utils/productService';

class ProductDetail extends HTMLElement {
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
      this.render();
      this.applyData();
    } catch (e) {
      console.error('상품 정보를 불러오지 못했습니다:', e);
    }
  }

  render() {
    this.innerHTML = `
    <section class="w-[312px] mx-6">
    <h2 class="sr-only">상품 설명</h2>
      <p class="mb-7" id="p-content">상품 설명</p>
      <ul class="list-disc list-outside pl-3 ml-4 flex flex-col gap-1 mb-8.5">
        <li id="p-color"></li>
        <li id="p-styleNo"></li>
      </ul>
      <a href="/" class="underline decoration-2 underline-offset-8"
        >상품 상세 정보 보기</a
      >
    </section>
  `;
  }
  applyData() {
    if (!this.product) return;

    const p = this.product.item;

    // 상품 설명 정보
    this.querySelector('#p-content')!.textContent =
      p.content ?? '상품 설명이 없습니다.';

    // 컬러 정보
    const color = p.extra?.color ?? [];
    this.querySelector('#p-color')!.textContent = '현재 컬러: ' + color;

    // 스타일 번호
    const styleNo = p.extra?.styleNo ?? [];
    this.querySelector('#p-styleNo')!.textContent = '스타일 번호: ' + styleNo;
  }
}

customElements.define('product-detail', ProductDetail);
