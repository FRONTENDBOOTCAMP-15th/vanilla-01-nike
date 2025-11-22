// 무한 스크롤 기능
export type ScrollState = {
  host: HTMLElement;
  itemsPerBatch: number;
  listElement: HTMLUListElement | null;
  sentinelElement: HTMLElement | null;
  observer?: IntersectionObserver;
  currentIndex: number;
  isLoading: boolean;
  hasLoadedAll: boolean;
};

export const createScrollState = (
  host: HTMLElement,
  itemsPerBatch: number,
): ScrollState => ({
  host,
  itemsPerBatch,
  listElement: null,
  sentinelElement: null,
  observer: undefined,
  currentIndex: 0,
  isLoading: false,
  hasLoadedAll: false,
});

export const syncScrollElements = (state: ScrollState) => {
  state.listElement = state.host.querySelector<HTMLUListElement>(
    '[data-product-list]',
  );
  state.sentinelElement = state.host.querySelector<HTMLElement>(
    '[data-scroll-sentinel]',
  );
};

export const resetScrollState = (state: ScrollState) => {
  state.currentIndex = 0;
  state.hasLoadedAll = false;
  state.isLoading = false;
  if (state.listElement) {
    state.listElement.innerHTML = '';
  }
  if (state.sentinelElement) {
    state.sentinelElement.textContent = '상품을 불러오는 중...';
    state.sentinelElement.classList.remove('text-[#111111]');
  }
};

const finishLoading = (state: ScrollState) => {
  if (!state.sentinelElement) return;
  state.hasLoadedAll = true;
  state.sentinelElement.textContent = '모든 상품을 확인했습니다.';
  state.sentinelElement.classList.add('text-[#111111]');
  state.observer?.disconnect();
};

export const appendNextBatch = <T>(
  state: ScrollState,
  items: T[],
  renderItem: (item: T) => string,
) => {
  if (
    !state.listElement ||
    !state.sentinelElement ||
    state.isLoading ||
    state.hasLoadedAll
  ) {
    return;
  }

  if (state.currentIndex >= items.length) {
    finishLoading(state);
    return;
  }

  state.isLoading = true;
  const nextItems = items.slice(
    state.currentIndex,
    state.currentIndex + state.itemsPerBatch,
  );

  if (nextItems.length) {
    state.listElement.insertAdjacentHTML(
      'beforeend',
      nextItems.map(renderItem).join(''),
    );
    state.currentIndex += nextItems.length;
  }

  if (state.currentIndex >= items.length) {
    finishLoading(state);
  } else {
    state.sentinelElement.textContent = '상품을 불러오는 중...';
    state.sentinelElement.classList.remove('text-[#111111]');
  }

  state.isLoading = false;
};

export const setupInfiniteObserver = (
  state: ScrollState,
  onIntersect: () => void,
) => {
  if (!state.sentinelElement) return;

  state.observer?.disconnect();
  state.observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    {
      root: null,
      rootMargin: '200px 0px',
      threshold: 0,
    },
  );

  state.observer.observe(state.sentinelElement);
};
