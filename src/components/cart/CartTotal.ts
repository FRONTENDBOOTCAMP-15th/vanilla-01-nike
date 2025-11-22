// 이미지 및 아이콘 임포트
import Img from '../../../public/images/imgShoes.jpg';
import Ico1 from '../../../public/icons/icoHeart.svg';
import Ico2 from '../../../public/icons/icoTrash.svg';

// 커스텀 엘리먼트 클래스 정의(Cart)
class Cart extends HTMLElement {
  // 엘리먼트가 DOM에 연결될 때 호출 되는 생명주기 메서드
  connectedCallback() {
    this.render();
  }

  // 렌더 될 메서드 - 테일윈드 작업
  render() {
    this.innerHTML = `
    <div class="wrap bg-white mx-auto w-[360px]">
      <section class="cart">
        <div class="cartTotal mt-14 mb-[30px] text-center">
          <h1 class="text-2xl font-medium leading-9 text-[#111]">장바구니</h1>
          <div class="relative leading-7">
            <span class="cartCount text-[#707072]">1개의 제품</span>
            <span class="absolute left-1/2 top-1.5 w-px h-4 -ml-0.5 bg-[#707070] -translate-x-1/2"></span>
            <span class="cartPrice ml-3 text-[#111]">189,000원</span>
          </div>
        </div>
        <!-- 장바구니에 상품이 있는 경우 / div에 이미지 나중에 추가하기-->
        <div class="cartList mx-auto w-[328px] pt-10 pb-10 border-t border-t-[#e5e5e5]">
          <div class="cartDetail flex">
            <div class="shrink-0 w-[154px] h-[154px]">
              <img src="${Img}" alt="상품 이미지" />
            </div>
            <div class="productInfo w-full ml-3 leading-7">
              <p class="price font-medium">189,000원</p>
              <p class="name font-medium">나이티 줌 보메로 5</p>
              <p class="target text-[rgb(112,112,114)]">남성 신발</p>
              <table class="w-full">
                <tr>
                  <td class="text-[#707072]">사이즈</td>
                  <td class="ledading-[16px] text-[#707072]">수량</td>
                </tr>
                <tr>
                  <td class="w-1/2 underline text-[#707072] cursor-pointer">275</td>
                  <td class="w-1/2">
                    <button class="miunsButton w-[30px] h-[30px] text-[#a6a6a6] cursor-pointer" type="button">-</button>
                    <span class="quantity text-[14px] text-[#707072]">1</span>
                    <button class="plusButton w-[30px] h-[30px] text-[#333] cursor-pointer" type="button">+</button>
                  </td>
                </tr>
              </table>
              <div class="cartButtons flex mt-7.5 ">
                <span class="likeHeart w-6 h-6 cursor-pointer">
                  <img src="${Ico1}" alt="찜하기 아이콘" />
                </span>
                <button class="deleteButton w-6 h-6 ml-4 cursor-pointer">
                  <img src="${Ico2}" alt="삭제 아이콘" />
                </button>
              </div>
            </div>
          </div>
          <div class="deliveryInfo mt-[17px]">
            <p class="font-medium leading-7 text-[#111]">무료배송</p>
            <p class="leading-7">
              도착 예정일: 7월 27일 (토) 배송지역:
              <a href="#" class="ml-[5px] font-medium leading-7 text-[#111] underline">04528</a>
            </p>
          </div>
        </div>
        <!-- 장바구니에 상품이 없는 경우 -->
        <!-- <div class="cartEmpty">
          <p class="text-center mt-10">장바구니에 담긴 상품이 없습니다.</p>
        </div> -->
      </section>
    </div>
  `;
  }
}

// 커스텀 엘리먼트 등록
customElements.define('cart-carttotal', Cart);

// 장바구니 토탈 수량 ------------------------------------------

// 장바구니 총합 인터페이스
interface CartTotal {
  cartCount: number;
  cartPrice: number;
}

// 초기 상태
const cartTotal: CartTotal = {
  cartCount: 1,
  cartPrice: 189000,
};

// DOM 요소 선택
const cartCountElement = document.querySelector(
  '.cartCount',
) as HTMLElement | null;
const cartPriceElement = document.querySelector(
  '.cartPrice',
) as HTMLElement | null;
const qtyDisplay = document.querySelector('.quantity') as HTMLElement | null;
const minusButton = document.querySelector(
  '.miunsButton',
) as HTMLButtonElement | null; // HTML에 맞춘 클래스명
const plusButton = document.querySelector(
  '.plusButton',
) as HTMLButtonElement | null;

// 화면 업데이트 함수
const updateDisplay = () => {
  if (!cartCountElement || !cartPriceElement || !qtyDisplay) return;

  // 수량 표시
  qtyDisplay.textContent = cartTotal.cartCount.toString();

  // 총 수량
  cartCountElement.textContent = `${cartTotal.cartCount}개의 제품`;

  // 총 가격
  cartPriceElement.textContent = `${(cartTotal.cartCount * cartTotal.cartPrice).toLocaleString('ko-KR')}원`;
};

// 초기 렌더링
updateDisplay();

// 이벤트 등록
minusButton?.addEventListener('click', () => {
  if (cartTotal.cartCount > 1) {
    cartTotal.cartCount--;
    updateDisplay();
  }
});

plusButton?.addEventListener('click', () => {
  cartTotal.cartCount++;
  updateDisplay();
});

// 하트 아이콘 (아이콘 변경하기)------------------------------------------------
const icoHeart = document.querySelector('.likeHeart');
icoHeart?.addEventListener('click', () => {
  // 하트 아이콘 클릭 시 동작할 코드 작성
  if (icoHeart.classList.contains('liked')) {
    icoHeart.classList.remove('liked');
    console.log('좋아요 취소');
  } else {
    icoHeart.classList.add('liked');
    console.log('좋아요');
  }
});

// 삭제 아이콘 (아이템 삭제하기)------------------------------------------------
const icoTrash = document.querySelector('.deleteButton');
icoTrash?.addEventListener('click', () => {
  // 삭제 아이콘 클릭 시 동작할 코드 작성
  console.log('아이템 삭제');
});
