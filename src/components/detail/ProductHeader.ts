import type { Products } from '../../types/Products';
import { fetchProductDetailByUrl } from '../../utils/productService';
import { getCategoryNames } from '../../utils/Category';

class ProductHeader extends HTMLElement {
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
      <div class="mt-20 mb-10.5">
        <section class="mx-6">
          <h1 class="text-xl" id="p-name">제품 이름</h1>
          <p class="text-base" id="p-category">제품 카테고리</p>
          <p class="mt-3 mb-6" id="p-price">가격 정보</p>
        </section>

        <img id="main-img" class="w-[360px] h-[450px] bg-gray-50 mb-1" />

        <section class="flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden" id="thumb-wrap">
          // 상품 상세 이미지 정보 삽입
        </section>
      </div>
    `;
  }

  applyData() {
    if (!this.product) return;

    const p = this.product.item;

    // 상품 이름
    this.querySelector('#p-name')!.textContent = p.name ?? '이름 없음';

    // 상품 카테고리 정보
    const categories = p.extra?.category ?? [];
    const lastCategoryCode = categories[categories.length - 1];
    const categoryName = lastCategoryCode
      ? getCategoryNames([lastCategoryCode])[0]
      : '';
    this.querySelector('#p-category')!.textContent = categoryName;

    // 상품 가격 정보
    this.querySelector('#p-price')!.textContent = p.price
      ? `${p.price.toLocaleString()}원`
      : '가격 정보 없음';

    // 상품 이미지 정보
    const mainImg = this.querySelector<HTMLImageElement>('#main-img');
    if (mainImg) {
      mainImg.src = p.mainImages?.[0]?.path ?? '';
    }

    // 상품 상세 이미지 정보
    const thumbWrap = this.querySelector('#thumb-wrap')!;
    thumbWrap.innerHTML = '';
    p.mainImages?.forEach((img: { path: string }) => {
      const el = document.createElement('img');
      el.src = img.path;
      el.className =
        'flex-shrink-0 w-[125px] h-[125px] rounded-[5px] object-cover';
      thumbWrap.appendChild(el);
    });
  }
}

customElements.define('product-header', ProductHeader);
