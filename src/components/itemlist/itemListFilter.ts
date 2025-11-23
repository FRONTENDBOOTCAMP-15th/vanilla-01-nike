import type { SortOption } from './itemListData';

// 모달에서 전달받는 필터 체크박스 상태
export type FilterFlags = {
  men?: boolean;
  women?: boolean;
  adult?: boolean;
  kids?: boolean;
  sale?: boolean;
};

type FilterConfig = {
  getCurrentSort: () => SortOption;
  getCurrentFilters?: () => FilterFlags;
  onApply: (option: SortOption, filters: FilterFlags) => void;
};

// 필터 모달 열기/닫기 및 상태 동기화 담당
export const initFilterModal = (host: HTMLElement, config: FilterConfig) => {
  const modal = host.querySelector<HTMLElement>('[data-filter-modal]');
  const openButton = host.querySelector<HTMLElement>('[data-filter-open]');
  const closeButton = host.querySelector<HTMLElement>('[data-filter-close]');
  const applyButton = host.querySelector<HTMLButtonElement>(
    '[data-filter-apply]',
  );
  const sortRadios =
    host.querySelectorAll<HTMLInputElement>('[data-sort-radio]');
  const filterCheckboxes =
    host.querySelectorAll<HTMLInputElement>('[data-filter-flag]');

  if (
    !modal ||
    !openButton ||
    !closeButton ||
    !applyButton ||
    !sortRadios.length
  )
    return;

  let pendingOption: SortOption = config.getCurrentSort();
  let pendingFilters: FilterFlags = { ...(config.getCurrentFilters?.() ?? {}) };

  const openModal = () => {
    pendingOption = config.getCurrentSort();
    pendingFilters = { ...(config.getCurrentFilters?.() ?? {}) };
    syncRadios();
    syncCheckboxes();
    modal.classList.remove('hidden');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  const syncRadios = () => {
    sortRadios.forEach(radio => {
      radio.checked = radio.value === pendingOption;
    });
  };

  const syncCheckboxes = () => {
    filterCheckboxes.forEach(box => {
      const key = box.value as keyof FilterFlags;
      box.checked = Boolean(pendingFilters[key]);
    });
  };

  sortRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        pendingOption = radio.value as SortOption;
      }
    });
  });

  filterCheckboxes.forEach(box => {
    box.addEventListener('change', () => {
      const key = box.value as keyof FilterFlags;
      if (box.checked) {
        pendingFilters[key] = true;
      } else {
        delete pendingFilters[key];
      }
    });
  });

  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  applyButton.addEventListener('click', () => {
    config.onApply(pendingOption, pendingFilters);
    closeModal();
  });
};
