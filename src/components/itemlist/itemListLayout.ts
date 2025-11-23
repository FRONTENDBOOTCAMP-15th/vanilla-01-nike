import type { SortOption } from './itemListData';

// 레이아웃에서 네비게이션/필터를 구성할 때 사용하는 카테고리 정의
type CategoryConfig = {
  label: string;
};

// 기본 카테고리 목록 (첫 번째는 전체 보기 역할을 함)
const DEFAULT_CATEGORIES: CategoryConfig[] = [
  { label: '신발' },
  { label: '탑 & 티셔츠' },
  { label: '후디 & 크루' },
  { label: '재킷 & 베스트' },
  { label: '팬츠 & 타이츠' },
  { label: '쇼츠' },
  { label: '스포츠 브라' },
  { label: '트랙수트' },
  { label: '점프수트 & 롬퍼스' },
  { label: '스커트 & 드레스' },
  { label: '양말' },
  { label: '용품' },
];

type LayoutOptions = {
  title: string;
  resultsText: string;
  sortOption: SortOption;
  categories?: CategoryConfig[];
  includeSentinel?: boolean;
  loaderText?: string;
};

// 카테고리 버튼 리스트를 생성한다.
const renderCategoryNav = (configs: CategoryConfig[]) => {
  const items = configs
    .map((config, index) => {
      const label = config.label;
      const activeClasses =
        index === 0 ? 'text-[#111111] font-semibold' : 'text-[#989898]';
      return `
        <li>
          <button
            type="button"
            class="categoryButton ${activeClasses} cursor-pointer bg-transparent border-none"
            data-category="${label}"
          >
            ${label}
          </button>
        </li>
      `;
    })
    .join('');

  return `
    <nav aria-label="기본 카테고리" class="categoryNav w-full pl-4 mt-4 mb-7">
      <ul
        class="categoryNavList flex gap-8 text-base font-medium px-1 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        ${items}
      </ul>
    </nav>
  `;
};

// 결과 수와 필터 버튼을 묶는 툴바
const renderToolbar = (resultsText: string) => `
  <div class="toolbar flex items-center justify-between">
    <p class="resultsText font-normal text-[#707072]" aria-live="polite">
      ${resultsText}
    </p>

    <button
      type="button"
      class="filterButton inline-flex items-center gap-1.5 py-2 px-5 mb-3 rounded-4xl border border-solid border-[#cacacb] bg-transparent text-base text-[#111111] cursor-pointer"
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
`;

// 정렬 옵션과 체크박스 필터를 포함한 모달
const renderFilterModal = (sortOption: SortOption) => `
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
                <input type="radio" name="sortOption" value="recommended" data-sort-radio ${sortOption === 'recommended' ? 'checked' : ''} />
                추천순
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="sortOption" value="new" data-sort-radio ${sortOption === 'new' ? 'checked' : ''} />
                신제품
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="sortOption" value="low" data-sort-radio ${sortOption === 'low' ? 'checked' : ''} />
                낮은 가격순
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="sortOption" value="high" data-sort-radio ${sortOption === 'high' ? 'checked' : ''} />
                높은 가격순
              </label>
            </div>
          </div>
          <div class="mb-6">
            <p class="text-sm font-semibold mb-2 text-[#111111]">상품 필터</p>
            <div class="flex flex-col gap-2 text-sm text-[#111111]">
              <label class="flex items-center gap-2">
                <input type="checkbox" value="men" data-filter-flag />
                남성
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" value="women" data-filter-flag />
                여성
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" value="kids" data-filter-flag />
                키즈
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" value="sale" data-filter-flag />
                세일
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
`;

export const renderItemListLayout = ({
  title,
  resultsText,
  sortOption,
  categories = DEFAULT_CATEGORIES,
  includeSentinel = false,
  loaderText = '상품을 불러오는 중...',
}: LayoutOptions) =>
  `
  <section aria-labelledby="newProducts" class="sectionWrapper w-full text-[#111111] relative">
    <div class="sectionHeader">
      <h1 class="newProducts pt-[13px] pb-7 pl-5 text-xl font-medium" data-category-title>
        ${title}
      </h1>
    </div>

    ${renderCategoryNav(categories)}
    ${renderToolbar(resultsText)}

    <ul
      class="productGrid grid grid-cols-2 gap-x-2.5 gap-y-1.5"
      style="list-style: none"
      data-product-list
    ></ul>
    ${
      includeSentinel
        ? `<div class="infiniteLoader flex justify-center py-6 text-sm text-[#707072]" data-scroll-sentinel>
            ${loaderText}
          </div>`
        : ''
    }
    ${renderFilterModal(sortOption)}
  </section>
`;

export const getDefaultCategories = () =>
  DEFAULT_CATEGORIES.map(item => ({ ...item }));
