import type { SortOption } from './itemListData';

type FilterConfig = {
  getCurrentSort: () => SortOption;
  onApply: (option: SortOption) => void;
};

// 필터 설정창 열기/닫기 및 정렬 라디오 동기화 담당
export const initFilterModal = (host: HTMLElement, config: FilterConfig) => {
  const modal = host.querySelector<HTMLElement>('[data-filter-modal]');
  const openButton = host.querySelector<HTMLElement>('[data-filter-open]');
  const closeButton = host.querySelector<HTMLElement>('[data-filter-close]');
  const applyButton = host.querySelector<HTMLButtonElement>(
    '[data-filter-apply]',
  );
  const sortRadios =
    host.querySelectorAll<HTMLInputElement>('[data-sort-radio]');

  if (
    !modal ||
    !openButton ||
    !closeButton ||
    !applyButton ||
    !sortRadios.length
  )
    return;

  let pendingOption: SortOption = config.getCurrentSort();

  const syncRadios = () => {
    sortRadios.forEach(radio => {
      radio.checked = radio.value === pendingOption;
    });
  };

  const openModal = () => {
    pendingOption = config.getCurrentSort();
    syncRadios();
    modal.classList.remove('hidden');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  sortRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        pendingOption = radio.value as SortOption;
      }
    });
  });

  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  applyButton.addEventListener('click', () => {
    config.onApply(pendingOption);
    closeModal();
  });
};
