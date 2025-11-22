import {
  fetchProductDetailByUrl,
  fetchProductsByCategory,
} from '../../utils/productService';
import { getCategoryNames } from '../../utils/Category';
import type { Product } from '../../types/Products';

class RecommendedProducts extends HTMLElement {
  products: Product[] = [];
  currentProduct: Product | null = null;

  async connectedCallback() {
    await this.loadProducts();
    this.render();
    this.applyData();
  }

  async loadProducts() {
    // 현재 제품 정보 가져오기
    const productDetail = await fetchProductDetailByUrl();
    if (!productDetail?.item) {
      console.error('상품 정보를 불러오지 못했습니다.');
      return;
    }

    // item이 존재하면 currentProduct에 할당
    this.currentProduct = productDetail.item;

    const categoryCodes = this.currentProduct.extra?.category ?? [];
    const lastCategoryCode = categoryCodes[categoryCodes.length - 1];

    // 현재 제품과 같은 카테고리 제품 가져오기
    if (lastCategoryCode) {
      this.products = await fetchProductsByCategory(lastCategoryCode);
    } else {
      this.products = [];
    }

    // 현재 제품은 제외
    this.products = this.products.filter(
      p => p._id !== this.currentProduct?._id,
    );
  }

  render() {
    this.innerHTML = `
    <section class="w-[312px] mx-6">
      <div class="flex flex-col px-6 pt-9 pb-3">
        <h2 class="text-2xl">추천 제품</h2>

        <!-- 좌우 이동 버튼 -->
        <div class="flex gap-3 justify-end" id="recommended-buttons">
          <!-- 이전 버튼 -->
          <button
            type="button"
            aria-label="이전 제품 보기"
            class="w-12 h-12 bg-[#f5f5f5] rounded-3xl cursor-pointer justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="m-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.5256 18.9662L8.55859 12.0002L15.5256 5.0332"
                stroke="#CACACB"
                stroke-width="1.5"
              />
            </svg>
          </button>

          <!-- 다음 버튼 -->
          <button
            type="button"
            aria-label="다음 제품 보기"
            class="w-12 h-12 bg-[#e5e5e5] rounded-3xl cursor-pointer justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="m-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8.47461 5.0338L15.4406 11.9998L8.47461 18.9668"
                stroke="#111111"
                stroke-width="1.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 제품 리스트 -->
      <ul
        class="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap px-6 pb-3" id="recommended-list"
      >
      </ul>
    </section>
  `;
  }

  applyData() {
    const list = this.querySelector('#recommended-list')!;
    const buttons = this.querySelector('#recommended-buttons') as HTMLElement;
    list.innerHTML = '';

    if (!this.currentProduct) return;

    const currentCategories = this.currentProduct.extra?.category ?? [];

    // 추천 제품 중 현재 제품과 동일한 마지막 카테고리를 가진 상품만 필터링
    const filteredProducts = this.products.filter(p => {
      const productCategories = p.extra?.category ?? [];
      // 마지막 카테고리까지 완전히 일치하는 경우만 반환
      return (
        productCategories[productCategories.length - 1] ===
        currentCategories[currentCategories.length - 1]
      );
    });

    if (filteredProducts.length === 0) {
      // 추천 제품이 없는 경우 안내 문구 & 버튼 숨김
      const li = document.createElement('li');
      li.className = 'text-center text-gray-500 w-full py-10';
      li.textContent = '추천 제품이 존재하지 않습니다.';
      list.appendChild(li);

      // 버튼 숨기기
      buttons.style.display = 'none';
      return;
    }

    // 버튼 표시
    buttons.style.display = 'flex';

    // 필터링된 추천 제품들을 리스트에 렌더링
    filteredProducts.forEach(p => {
      const li = document.createElement('li');
      li.className =
        'flex flex-col gap-3 shrink-0 text-sm pb-10 cursor-pointer';

      const categoryNames = getCategoryNames(p.extra?.category ?? []);
      const lastCategoryName = categoryNames[categoryNames.length - 1] ?? '';

      li.innerHTML = `
      <img src="${p.mainImages?.[0]?.path ?? ''}" alt="${p.name}" class="w-[196px] h-[196px] bg-gray-50 rounded-sm" />
      <p>${p.name}</p>
      <p class="text-[#707072]">${lastCategoryName}</p>
      <p>${p.price?.toLocaleString() ?? 0} 원</p>
    `;

      li.addEventListener('click', () => {
        window.location.href = `/src/pages/detail?_id=${p._id}`;
      });

      list.appendChild(li);
    });
  }
}

customElements.define('recommended-products', RecommendedProducts);
