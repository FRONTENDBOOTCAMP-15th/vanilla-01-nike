import { fetchProducts, filterByCategory, sortProducts } from './itemListData';
import type { Product, SortOption } from './itemListData';
import { createProductCard } from './itemListProduct';
import { initFilterModal } from './itemListFilter';
import type { FilterFlags } from './itemListFilter';
import { renderItemListLayout } from './itemListLayout';
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
  private activeCategory = '';
  private sortOption: SortOption = 'recommended';
  private hasForcedInitialScroll = false;
  private filterFlags: FilterFlags = {};

  async connectedCallback() {
    await this.loadProducts();
    this.render();
    this.initializeModules();
    this.ensureInitialScrollPosition();
  }

  disconnectedCallback() {
    this.scrollState?.observer?.disconnect();
  }

  private filterByFlags(list: Product[]) {
    const activeKeys = Object.entries(this.filterFlags).filter(
      ([, value]) => Boolean(value),
    );
    if (!activeKeys.length) {
      return [...list];
    }

    return list.filter(product =>
      activeKeys.every(([key]) => {
        switch (key) {
          case 'men':
            return product.extra?.gender?.toLowerCase() === 'men';
          case 'women':
            return product.extra?.gender?.toLowerCase() === 'women';
          case 'adult':
            return product.extra?.gender?.toLowerCase() !== 'kids';
          case 'kids':
            return product.extra?.gender?.toLowerCase() === 'kids';
          case 'sale':
            return (
              typeof product.price === 'number' &&
              typeof product.extra?.primeCost === 'number' &&
              product.price < product.extra.primeCost
            );
          default:
            return false;
        }
      }),
    );
  }

  private refreshFilteredProducts() {
    const flagFiltered = this.filterByFlags(this.products);
    const categoryFiltered = filterByCategory(flagFiltered, this.activeCategory);
    this.filteredProducts = sortProducts(categoryFiltered, this.sortOption);
  }

  // API 데이터를 불러와 초기 정렬 상태로 맞춤
  private async loadProducts() {
    try {
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type') ?? 'default';
      const data = await fetchProducts();
      this.products = data;
      this.filterFlags = {};
      switch (type) {
        case 'new':
          this.products = data.filter(product => product.extra?.isNew);
          this.filterFlags = {};
          break;
        case 'men':
          this.filterFlags = { men: true };
          break;
        case 'women':
          this.filterFlags = { women: true };
          break;
        case 'kids':
          this.filterFlags = { kids: true };
          break;
        case 'sale':
          this.filterFlags = { sale: true };
          break;
        default:
          break;
      }
      this.products = sortProducts(this.products, this.sortOption);
      this.refreshFilteredProducts();
    } catch (error) {
      console.error('상품 정보를 불러오는 데 실패했습니다.', error);
      this.products = [];
    }
  }

  // 메인 레이아웃과 필터 모달을 렌더링
  private render() {
    const resultsText =
      this.products.length > 0
        ? `${this.products.length}개의 결과`
        : '표시할 상품이 없습니다.';

    const layoutMarkup = renderItemListLayout({
      title: '신발',
      resultsText,
      sortOption: this.sortOption,
      includeSentinel: true,
      loaderText: '상품을 불러오는 중...',
    });

    this.innerHTML = `
      <body class="bg-white box-border">
        <main class="w-full py-20">
          ${layoutMarkup}
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
      getCurrentFilters: () => ({ ...this.filterFlags }),
      onApply: (option, filters) => {
        this.filterFlags = { ...filters };
        this.applySort(option);
      },
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
    const titleElement =
      this.querySelector<HTMLElement>('[data-category-title]');

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

      if (target && titleElement) {
        const label = target.textContent?.trim();
        if (label) {
          titleElement.textContent = label;
        }
      }
    };

    buttons.forEach((button, index) => {
      const key = button.dataset.category ?? '';
      button.addEventListener('click', () => {
        this.applyCategoryFilter(key);
        setActive(button);
      });

      if (index === 0) {
        setActive(button);
        this.applyCategoryFilter(key);
      }
    });

    return true;
  }
  // 선택된 카테고리에 맞춰 필터/정렬을 적용
  private applyCategoryFilter(label: string) {
    this.activeCategory = label.trim();
    this.refreshFilteredProducts();
    this.rebuildList();
  }

  // 모달에서 고른 정렬 옵션을 반영함
  private applySort(option: SortOption) {
    this.sortOption = option;
    this.refreshFilteredProducts();
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
      originalPrice: product.extra?.primeCost,
      mainImage: imageUrl,
      isNew: product.extra?.isNew,
      category,
      colorVariants: colorCount,
    });
  }
}

customElements.define('item-list', ItemList);
