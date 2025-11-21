import type { Products } from '../../types/Products';
import { fetchProductDetailByUrl } from '../../utils/productService';

class SizeSelector extends HTMLElement {
  product: Products | null = null;

  // 선택된 사이즈 상태 저장 (중복 클릭 시 해제)
  private selectedSize: string | null = null;

  async connectedCallback() {
    // URL 쿼리 스트링에서 제품 ID 가져오기
    try {
      const data = await fetchProductDetailByUrl();
      if (!data) {
        console.error('제품 ID가 없거나 데이터를 불러올 수 없습니다.');
        return;
      }

      // 제품 데이터 받아오기
      this.product = data;
      this.render();
      this.applyData();
    } catch (e) {
      console.error('제품 정보를 불러오지 못했습니다:', e);
    }
  }

  render() {
    this.innerHTML = `
    <div class="w-[312px] mx-6 mb-8">
      <div class="flex justify-between items-center mb-2">
        <p class="">사이즈 선택</p>
        <p class="text-gray-600">사이즈 가이드</p>
      </div>
      <div class="flex flex-wrap justify-start gap-1.75 mt-2.25 m-0.5" id="p-size">
        // 사이즈 정보 표시
      </div>
    </div>
  `;
  }

  applyData() {
    if (!this.product) return;

    const p = this.product.item;

    // 사이즈 정보
    const sizes = this.querySelector('#p-size')!;
    sizes.innerHTML = '';

    p.extra?.size?.forEach(size => {
      const el = document.createElement('button');
      el.type = 'button';
      el.ariaLabel = 'sizeButton';
      el.className =
        'w-14 h-12 border border-[#E5E5E5] cursor-pointer rounded-sm';
      el.textContent = size;

      // 사이즈 버튼 클릭 시 실행되는 이벤트 핸들러 (기존 선택 상태를 초기화하고, 현재 버튼을 선택/해제 토글 처리)
      el.addEventListener('click', () => {
        // 이미 선택된 버튼 스타일 초기화
        const allButtons = sizes.querySelectorAll('button');
        allButtons.forEach(btn =>
          btn.classList.remove('border-black', 'bg-black', 'text-white'),
        );

        // 이미 선택된 사이즈를 다시 클릭한 경우 선택 해제
        if (this.selectedSize === size) {
          this.selectedSize = null;
          // 전역 이벤트로 선택 해제 상태 전달
          window.dispatchEvent(
            new CustomEvent('size:selected', { detail: { size: null } }),
          );
          return;
        }

        // 새로운 사이즈 선택 처리
        this.selectedSize = size;
        el.classList.add('border-black', 'bg-black', 'text-white');
        // 전역 이벤트로 선택된 사이즈 전달
        window.dispatchEvent(
          new CustomEvent('size:selected', { detail: { size: size } }),
        );
      });

      sizes.appendChild(el);
    });
  }
}

customElements.define('size-selector', SizeSelector);
