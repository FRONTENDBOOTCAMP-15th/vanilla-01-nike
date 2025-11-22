import { fetchProducts, filterByCategory, sortProducts } from './itemListData';
import type { Product, SortOption } from './itemListData';
import { createProductCard } from './itemListProduct';
import { initFilterModal } from './itemListFilter';
import {
  createScrollState,
  resetScrollState,
  syncScrollElements,
  appendNextBatch,
  setupInfiniteObserver,
} from './itemListScroll';
import type { ScrollState } from './itemListScroll';

// 상품 리스트 UI 전반을 담당하는 커스텀 엘리먼트
class ItemList extends HTMLElement {
  private products: Product[] = [];
  private filteredProducts: Product[] = [];
  private readonly itemsPerBatch = 4;
  private scrollState?: ScrollState;
  private activeCategory = '신발';
  private sortOption: SortOption = 'recommended';
  private hasForcedInitialScroll = false;

  async connectedCallback() {
    await this.loadProducts();
    this.render();
    this.initializeModules();
    this.ensureInitialScrollPosition();
  }

  disconnectedCallback() {
    this.scrollState?.observer?.disconnect();
  }

  // API 데이터를 불러와 초기 정렬 상태로 맞춤
  private async loadProducts() {
    try {
      const data = await fetchProducts();
      this.products = data;
      this.filteredProducts = sortProducts(this.products, this.sortOption);
    } catch (error) {
      console.error('상품 정보를 불러오는 데 실패했습니다.', error);
      this.products = [];
      this.filteredProducts = [];
    }
  }

  // 메인 레이아웃과 필터 모달을 렌더링
  private render() {
    const resultsText =
      this.filteredProducts.length > 0
        ? `${this.filteredProducts.length}개의 결과`
        : '표시할 상품이 없습니다.';

    this.innerHTML = `
    <body class="bg-white box-border">
      <main class="w-full py-20">
        <section aria-labelledby="newProducts" class="sectionWrapper w-full text-[#111111] relative">
          <div class="sectionHeader">
            <h1 class="newProducts pt-[13px] pb-7 pl-5 text-xl font-medium">
              신제품
            </h1>
          </div>

          <!-- 카테고리 네비게이션 -->
          <nav aria-label="기본 카테고리" class="categoryNav w-full pl-4 mt-4 mb-7">
            <ul
              class="categoryNavList flex gap-8 text-base font-medium px-1 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
              role="list"
            >
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>신발</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>탑 & 티셔츠</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>후디 & 크루</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>재킷 & 베스트</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>팬츠 & 타이츠</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>쇼츠</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>스포츠 브라</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>트랙수트</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>점프수트 & 롬퍼스</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>스커트 & 드레스</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>양말</button></li>
              <li><button type="button" class="categoryButton text-[#989898] cursor-pointer bg-transparent border-none" data-category>용품</button></li>
            </ul>
          </nav>

          <!-- 검색 결과 + 필터 -->
          <div class="toolbar flex items-center justify-between">
            <p class="resultsText ml-5 font-normal text-[#707072]" aria-live="polite">
              ${resultsText}
            </p>

            <button
              type="button"
              class="filterButton inline-flex items-center gap-1.5 py-2 px-5 mr-5 mb-3 rounded-4xl border border-solid border-[#cacacb] bg-transparent text-base text-[#111111] cursor-pointer"
              aria-haspopup="dialog"
              aria-controls="filterPanel"
              data-filter-open
            >
              <span class="filterText font-medium">필터</span>
              <span class="filterButtonIcon inline-block relative w-[18px] h-[25px]" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 8.25H10M4.75 8.25H3" stroke="#111111" stroke-width="1.5" />
                  <path
                    d="M7.5 6C7.20453 6 6.91194 6.0582 6.63896 6.17127C6.36598 6.28434 6.11794 6.45008 5.90901 6.65901C5.70008 6.86794 5.53434 7.11598 5.42127 7.38896C5.3082 7.66194 5.25 7.95453 5.25 8.25C5.25 8.54547 5.3082 8.83806 5.42127 9.11104C5.53434 9.38402 5.70008 9.63206 5.90901 9.84099C6.11794 10.0499 6.36598 10.2157 6.63896 10.3287C6.91194 10.4418 7.20453 10.5 7.5 10.5C8.09674 10.5 8.66903 10.2629 9.09099 9.84099C9.51295 9.41903 9.75 8.84674 9.75 8.25C9.75 7.65326 9.51295 7.08097 9.09099 6.65901C8.66903 6.23705 8.09674 6 7.5 6Z"
                    stroke="#111111"
                    stroke-width="1.5"
                  />
                  <path d="M3 15.75H13.75M18.75 15.75H21" stroke="#111111" stroke-width="1.5" />
                  <path
                    d="M16.5 13.5C15.9033 13.5 15.331 13.7371 14.909 14.159C14.4871 14.581 14.25 15.1533 14.25 15.75C14.25 16.3467 14.4871 16.919 14.909 17.341C15.331 17.7629 15.9033 18 16.5 18C17.0967 18 17.669 17.7629 18.091 17.341C18.5129 16.919 18.75 16.3467 18.75 15.75C18.75 15.1533 18.5129 14.581 18.091 14.159C17.669 13.7371 17.0967 13.5 16.5 13.5Z"
                    stroke="#111111"
                    stroke-width="1.5"
                  />
                </svg>
              </span>
            </button>
          </div>

          <ul
            class="productGrid grid grid-cols-2 gap-x-2.5 gap-y-1.5"
            style="list-style: none"
            data-product-list
          ></ul>
          <div class="infiniteLoader flex justify-center py-6 text-sm text-[#707072]" data-scroll-sentinel>
            상품을 불러오는 중...
          </div>
          <div
            class="filterModal fixed inset-x-0 top-[60px] bottom-0 bg-white/70 z-30 hidden"
            data-filter-modal
            aria-modal="true"
            role="dialog"
          >
            <div class="w-full h-full flex justify-center overflow-hidden">
              <div class="bg-white w-[360px] h-full flex flex-col shadow-sm">
                <div class="sticky top-0 bg-white flex justify-between items-center px-5 pt-[13px] pb-4 border-b border-[#e5e5e5]">
                  <h2 class="text-2xl font-semibold text-[#111111]">필터 설정</h2>
                  <button
                    type="button"
                    class="p-2 cursor-pointer"
                    aria-label="필터 닫기"
                    data-filter-close
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6L18 18M18 6L6 18" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div class="flex-1 px-6 pb-10">
                  <div class="mb-6">
                    <p class="text-sm font-semibold mt-4 mb-2 text-[#111111]">정렬 기준</p>
                    <div class="flex flex-col gap-2 text-sm text-[#111111]">
                      <label class="flex items-center gap-2">
                        <input type="radio" name="sortOption" value="recommended" data-sort-radio ${
                          this.sortOption === 'recommended' ? 'checked' : ''
                        } />
                        추천순
                      </label>
                      <label class="flex items-center gap-2">
                        <input type="radio" name="sortOption" value="new" data-sort-radio ${
                          this.sortOption === 'new' ? 'checked' : ''
                        } />
                        신제품
                      </label>
                      <label class="flex items-center gap-2">
                        <input type="radio" name="sortOption" value="low" data-sort-radio ${
                          this.sortOption === 'low' ? 'checked' : ''
                        } />
                        낮은 가격순
                      </label>
                      <label class="flex items-center gap-2">
                        <input type="radio" name="sortOption" value="high" data-sort-radio ${
                          this.sortOption === 'high' ? 'checked' : ''
                        } />
                        높은 가격순
                      </label>
                    </div>
                  </div>
                </div>
                <div class="sticky bottom-0 bg-white border-t border-[#e5e5e5] p-4">
                  <button
                    type="button"
                    class="cursor-pointer w-full py-3 bg-black text-white rounded-4xl text-base font-semibold"
                    data-filter-apply
                  >
                    적용
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
    `;
  }

  // 카테고리, 필터 모달, 무한 스크롤을 초기화.
  private initializeModules() {
    this.scrollState = createScrollState(this, this.itemsPerBatch);
    syncScrollElements(this.scrollState);

    const initialized = this.setupCategoryButtons();
    initFilterModal(this, {
      getCurrentSort: () => this.sortOption,
      onApply: option => this.applySort(option),
    });

    if (!initialized) {
      this.applyCategoryFilter(this.activeCategory);
    }
  }
  // 새로고침 후 바닥에서 시작하지 않도록 강제로 스크롤을 올림
  private ensureInitialScrollPosition() {
    if (this.hasForcedInitialScroll) return;
    this.hasForcedInitialScroll = true;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }

  private setupCategoryButtons() {
    const buttons = this.querySelectorAll<HTMLButtonElement>('[data-category]');
    if (!buttons.length || !this.scrollState) return false;

    const setActive = (target?: HTMLButtonElement) => {
      buttons.forEach(button => {
        if (button === target) {
          button.classList.add('text-[#111111]', 'activeCategory');
          button.classList.remove('text-[#989898]');
        } else {
          button.classList.remove('text-[#111111]', 'activeCategory');
          button.classList.add('text-[#989898]');
        }
      });
    };

    buttons.forEach((button, index) => {
      const label = button.textContent?.trim() ?? '';
      button.addEventListener('click', () => {
        this.applyCategoryFilter(label);
        setActive(button);
      });

      if (index === 0) {
        setActive(button);
        this.applyCategoryFilter(label);
      }
    });

    return true;
  }

  // 선택된 카테고리에 맞춰 필터/정렬을 적용
  private applyCategoryFilter(label: string) {
    this.activeCategory = label || '신발';
    const filtered = filterByCategory(this.products, this.activeCategory);
    this.filteredProducts = sortProducts(filtered, this.sortOption);
    this.rebuildList();
  }

  // 모달에서 고른 정렬 옵션을 반영함
  private applySort(option: SortOption) {
    this.sortOption = option;
    const filtered = filterByCategory(this.products, this.activeCategory);
    this.filteredProducts = sortProducts(filtered, this.sortOption);
    this.rebuildList();
  }

  // 무한 스크롤 상태와 목록을 초기화한 뒤 다시 채움
  private rebuildList() {
    if (!this.scrollState) return;
    syncScrollElements(this.scrollState);
    const { listElement, sentinelElement } = this.scrollState;
    const resultsText = this.querySelector('.resultsText');

    if (!listElement || !sentinelElement) return;

    resetScrollState(this.scrollState);

    if (!this.filteredProducts.length) {
      listElement.innerHTML =
        '<li class="col-span-2 py-10 text-center text-[#707072]">해당 카테고리의 상품이 없습니다.</li>';
      sentinelElement.textContent = '';
      resultsText && (resultsText.textContent = '0개의 결과');
      this.scrollState.observer?.disconnect();
      return;
    }

    resultsText &&
      (resultsText.textContent = `${this.filteredProducts.length}개의 결과`);

    this.renderNextBatch();
    setupInfiniteObserver(this.scrollState, () => this.renderNextBatch());
  }

  // 무한 스크롤에서 다음 아이템 묶음을 추가
  private renderNextBatch() {
    if (!this.scrollState) return;
    appendNextBatch(this.scrollState, this.filteredProducts, product =>
      this.createProductMarkup(product),
    );
  }

  // 상품 1개의 카드 마크업을 만듦
  private createProductMarkup(product: Product) {
    const imageUrl = product.mainImages?.[0]?.path;
    const categories = product.extra?.category ?? [];
    const category =
      categories[categories.length - 1] ?? categories[0] ?? '카테고리';
    const color = product.extra?.color;
    const colorCount = color ? color.split('/').length : 1;

    return createProductCard({
      id: product.id,
      name: product.name,
      price: product.price,
      mainImage: imageUrl,
      isNew: product.extra?.isNew,
      category,
      colorVariants: colorCount,
    });
  }
}

customElements.define('item-list', ItemList);
