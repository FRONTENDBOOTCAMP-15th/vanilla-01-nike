import axios from 'axios';
import { getAxios } from '../../utils/axios';

class ProductButtonBase extends HTMLElement {
  private selectedSize: string | null = null; // 현재 선택된 사이즈 값
  private productId: number | null = null; // 현재 제품 ID

  // 외부에서 ID를 전달할 수 있는 메서드
  setProductId(id: number) {
    this.productId = id;
  }

  protected bindEvents(buttonSelector = 'button') {
    // SizeSelector에서 선택된 사이즈 이벤트 수신
    window.addEventListener('size:selected', (e: Event) => {
      const customEvent = e as CustomEvent;
      this.selectedSize = customEvent.detail.size;
    });

    const button = this.querySelector<HTMLButtonElement>(buttonSelector);
    if (!button) return;

    // 장바구니 버튼 클릭 이벤트
    button.addEventListener('click', async () => {
      // 사이즈 미선택 시 예외 처리
      if (!this.selectedSize) {
        alert('사이즈를 선택해주세요!');
        return;
      }
      // 제품 ID가 없는 경우 예외 처리
      if (!this.productId) {
        alert('제품 정보가 없습니다.');
        return;
      }

      // 장바구니 추가 API 호출
      try {
        const axiosInstance = getAxios();
        await axiosInstance.post('/carts/', {
          product_id: this.productId,
          quantity: 1,
          size: this.selectedSize,
          color: '',
        });

        alert('장바구니에 추가되었습니다!');
        this.selectedSize = null; // 선택 초기화
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          // 로그인을 하지 않은 경우
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            alert('로그인이 필요한 기능입니다.\n로그인 후 이용해주세요.');
            return;
          }
        }

        alert('장바구니 추가 중 오류가 발생했습니다.');
      }
    });
  }
  protected render(): void {}
}

export class ProductButtonTop extends ProductButtonBase {
  connectedCallback() {
    this.render();
    this.bindEvents('button:first-of-type');
  }

  protected render() {
    this.innerHTML = `
      <div class="flex flex-col gap-3 mx-6 mb-8">
      <!-- 상단 장바구니 버튼 -->
      <button
        type="button"
        class="bg-black text-white cursor-pointer py-5 px-31 rounded-[30px]"
      >
        장바구니
      </button>

      <!-- 위시리스트 버튼 -->
      <button
        type="button"
        class="flex items-center justify-center gap-1 bg-white text-black border border-[#cacacb] cursor-pointer py-4.75 px-25.25 rounded-[30px]"
      >
        위시리스트
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.794 3.75002C18.118 3.75002 19.362 4.26602 20.298 5.20102C21.2262 6.13093 21.7475 7.39113 21.7475 8.70502C21.7475 10.0189 21.2262 11.2791 20.298 12.209L12 20.508L3.70096 12.209C2.77307 11.2791 2.25195 10.0192 2.25195 8.70552C2.25195 7.39188 2.77307 6.13189 3.70096 5.20202C4.15999 4.74032 4.70604 4.37425 5.30751 4.12501C5.90897 3.87578 6.5539 3.74832 7.20496 3.75002C8.52896 3.75002 9.77296 4.26602 10.709 5.20102L11.469 5.96102L12 6.49202L12.53 5.96102L13.29 5.20102C13.7492 4.73963 14.2953 4.37384 14.8967 4.12478C15.4982 3.87573 16.143 3.74835 16.794 3.75002Z"
            stroke="#111111"
            stroke-width="1.5"
          />
        </svg>
      </button>
    </div>
    `;
  }
}

export class ProductButtonBottom extends ProductButtonBase {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  protected render() {
    this.innerHTML = `
      <button type="button" class="bg-black text-white cursor-pointer py-5 px-37">
        장바구니
      </button>
    `;
  }
}

customElements.define('product-button-top', ProductButtonTop);
customElements.define('product-button-bottom', ProductButtonBottom);
