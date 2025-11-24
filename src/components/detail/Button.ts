import axios from 'axios';
import { getAxios } from '../../utils/axios';

class ProductButtonBase extends HTMLElement {
  private selectedSize: string | null = null; // 현재 선택된 사이즈 값
  private productId: number | null = null; // 현재 제품 ID
  private bookmarkId: number | null = null; // 해당 상품의 북마크 ID (사용자가 위시리스트에 추가한 경우 서버에서 받은 ID)
  private isBookmarked: boolean = false; // 현재 상품이 사용자의 위시리스트에 등록되어 있는지 상태

  // 외부에서 ID를 전달할 수 있는 메서드
  setProductId(id: number) {
    this.productId = id;
    this.checkBookmarkStatus();
  }

  // 위시리스트 상태에 따라 아이콘 변경
  protected updateWishlistIcon() {
    const icon = this.querySelector<SVGElement>('.wishlist-icon');
    const path = icon?.querySelector('path');

    if (!icon || !path) return;

    if (this.isBookmarked) {
      // 위시리스트 추가 시 하트 색상
      icon.setAttribute('fill', '#E53935');
      path.setAttribute('stroke', '#E53935');
    } else {
      // 위시리스트 추가되지 않은 상태의 색상
      icon.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#111111');
    }
  }

  protected bindEvents() {
    // SizeSelector에서 선택된 사이즈 이벤트 수신
    window.addEventListener('size:selected', (e: Event) => {
      const customEvent = e as CustomEvent;
      this.selectedSize = customEvent.detail.size;
    });

    const buttons = this.querySelectorAll<HTMLButtonElement>('button');
    const cartButton = buttons[0];
    const wishlistButton = buttons[1] || null;

    const axiosInstance = getAxios();

    // 장바구니 버튼 클릭 이벤트
    if (cartButton) {
      cartButton.addEventListener('click', async () => {
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

    // 위시리스트 버튼 클릭
    if (wishlistButton) {
      wishlistButton.addEventListener('click', async () => {
        // 제품 ID가 없다면 중단
        if (!this.productId) {
          alert('제품 정보가 없습니다.');
          return;
        }

        try {
          // 현재 제품이 북마크되어 있지 않은 경우
          if (!this.isBookmarked) {
            try {
              // 서버에 북마크 추가 요청
              const res = await axiosInstance.post('/bookmarks/product', {
                target_id: this.productId,
              });

              // 서버에서 반환된 북마크 ID 저장
              this.bookmarkId = res.data?.item?._id;
              this.isBookmarked = true;
              this.updateWishlistIcon();
              alert('위시리스트에 추가되었습니다!');
            } catch (err: any) {
              if (axios.isAxiosError(err) && err.response?.status === 409) {
                // 이미 북마크된 제품인 경우
                console.warn('이미 북마크된 제품입니다.');
                await this.checkBookmarkStatus(); // 서버에서 상태 가져오기
                this.updateWishlistIcon();
              } else if (err.response?.status === 401) {
                // 로그인되지 않은 경우
                alert('로그인이 필요한 기능입니다.\n로그인 후 이용해주세요.');
                return;
              } else {
                throw err; // 그 외 에러는 상위 catch로 전달
              }
            }
          } else {
            if (!this.bookmarkId) {
              alert('북마크 정보가 없습니다.');
              return;
            }
            // 북마크 삭제 요청
            await axiosInstance.delete(`/bookmarks/${this.bookmarkId}`);
            this.isBookmarked = false;
            this.bookmarkId = null;
            this.updateWishlistIcon();
            alert('위시리스트가 취소되었습니다.');
          }
        } catch (error) {
          console.error(error);
          alert('위시리스트 처리 중 오류가 발생했습니다.');
        }
      });
    }
  }

  // 현재 제품의 북마크 상태 확인
  protected async checkBookmarkStatus() {
    if (!this.productId) return;

    try {
      const axiosInstance = getAxios();
      // 해당 제품의 북마크 정보 조회
      const res = await axiosInstance.get(
        `/bookmarks/product/${this.productId}`,
      );

      if (res.data?.item) {
        // 북마크가 존재하면 상태 업데이트
        this.isBookmarked = true;
        this.bookmarkId = res.data.item._id;
      } else {
        // 북마크가 존재하지 않으면 상태 초기화
        this.isBookmarked = false;
        this.bookmarkId = null;
      }

      setTimeout(() => this.updateWishlistIcon(), 0);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // 북마크가 없는 경우 정상 처리
        this.isBookmarked = false;
        this.bookmarkId = null;
      } else {
        console.error('북마크 상태 확인 중 오류:', error);
      }
    } finally {
      this.updateWishlistIcon();
    }
  }

  protected render(): void {}
}

export class ProductButtonTop extends ProductButtonBase {
  connectedCallback() {
    this.render();
    this.bindEvents();
    this.checkBookmarkStatus();
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
          class="wishlist-icon"
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
