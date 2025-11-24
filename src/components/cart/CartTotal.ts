// 이미지 및 아이콘 임포트
import Img from '../../../public/images/imgShoes.jpg';
import Ico1 from '../../../public/icons/icoHeart.svg';
import Ico2 from '../../../public/icons/icoHeartFill.svg';
import Ico3 from '../../../public/icons/icoTrash.svg';

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
        <!-- 장바구니에 상품이 있는 경우 -->
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
                  <img src="${Ico3}" alt="삭제 아이콘" />
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
      <section class="orderDetails mx-auto w-[328px] pt-10 pb-10 border-t border-t-[#e5e5e5]">
        <h2 class="text-2xl font-medium leading-9 text-[#111]">주문 내역</h2>
        <!-- 장바구니에 상품이 있는 경우 -->
        <table class="w-full mt-6 leading-9 text-[#111]">
          <tr>
            <td class="relative">
              상품금액<span
                class="flex items-center justify-center cursor-pointer bg-black text-white w-3 h-3 rounded-xl text-[11px] absolute top-3 left-16"
                >?</span
              >
            </td>
            <td class="text-right pl-4">189,000원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td class="text-right pl-4">무료</td>
          </tr>
          <tr class="mt-3">
            <td>총 결제 금액</td>
            <td class="text-right pl-4">189,000원</td>
          </tr>
        </table>
        <button type="button" class="block cursor-pointer w-full h-full px-5 py-5 mt-5 text-white border-[#111]] bg-[#111] rounded-4xl hover:bg-[#707072] "><span class="block">주문 결제</span></button>
        <!-- 장바구니에 상품이 없는 경우 -->
        <!-- <div class="cartEmpty">
          <p class="text-center mt-10">장바구니에 담긴 상품이 없습니다.</p>
        </div> -->
      </section>
    </div>
  `;
  }
}

// 커스텀 엘리먼트 등록 ------------------------------------------------------
customElements.define('cart-carttotal', Cart);

// 장바구니 토탈 수량 --------------------------------------------------------
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

// 주문 내역 부분: 상품 금액과 총 결제 금액 선택
const orderItemPrice = document.querySelector(
  '.orderDetails table tr:nth-child(1) td:nth-child(2)',
) as HTMLElement | null; // 상품 금액
const totalPriceElement = document.querySelector(
  '.orderDetails table tr:nth-child(3) td:nth-child(2)',
) as HTMLElement | null; // 총 결제 금액

// 화면 업데이트 함수
const updateDisplay = (): void => {
  if (
    !cartCountElement ||
    !cartPriceElement ||
    !qtyDisplay ||
    !orderItemPrice ||
    !totalPriceElement
  ) {
    console.error('필수 DOM 요소가 선택되지 않았습니다.');
    return;
  }

  // 수량 표시
  qtyDisplay.textContent = cartTotal.cartCount.toString();

  // 총 수량
  cartCountElement.textContent = `${cartTotal.cartCount}개의 제품`;

  // 총 가격 (장바구니 부분)
  const totalProductPrice = cartTotal.cartCount * cartTotal.cartPrice;
  cartPriceElement.textContent = `${totalProductPrice.toLocaleString('ko-KR')}원`;

  // 상품 금액 업데이트 (주문 내역)
  if (orderItemPrice) {
    console.log('상품 금액 업데이트');
    orderItemPrice.textContent = `${cartTotal.cartPrice.toLocaleString('ko-KR')}원`; // 상품 하나의 가격을 업데이트
  }

  // 총 결제 금액 업데이트
  if (totalPriceElement) {
    totalPriceElement.textContent = `${totalProductPrice.toLocaleString('ko-KR')}원`;
  }
};

// 페이지 로딩 후 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {
  // 초기 렌더링
  updateDisplay();

  // 버튼 클릭 시 이벤트 처리
  minusButton?.addEventListener('click', (): void => {
    if (cartTotal.cartCount > 1) {
      cartTotal.cartCount--;
      updateDisplay();
    }
  });

  plusButton?.addEventListener('click', (): void => {
    cartTotal.cartCount++;
    updateDisplay();
  });
});

// 하트 아이콘 -------------------------------------------------------------
const icoHeart = document.querySelector('.likeHeart');
const heartIcon = icoHeart ? icoHeart.querySelector('img') : null; // <img> 태그를 선택, icoHeart가 null일 경우 null을 반환

// icoHeart가 존재하는 경우에만 이벤트 리스너 등록
if (icoHeart && heartIcon) {
  icoHeart.addEventListener('click', () => {
    // 하트 아이콘 클릭 시 동작할 코드 작성
    if (icoHeart.classList.contains('liked')) {
      icoHeart.classList.remove('liked');
      heartIcon.src = Ico1; // 기본 하트 아이콘으로 변경
    } else {
      icoHeart.classList.add('liked');
      heartIcon.src = Ico2; // 채워진 하트 아이콘으로 변경
    }
  });
}

// 삭제 아이콘 (아이템 삭제하기)------------------------------------------------
// const icoTrash = document.querySelector('.deleteButton');
// icoTrash?.addEventListener('click', () => {
//   // 삭제 아이콘 클릭 시 동작할 코드 작성
//   console.log('아이템 삭제');
// });

// 삭제 아이콘 (아이템 삭제하기)------------------------------------------------
const icoTrash = document.querySelector('.deleteButton');
const cartList = document.querySelector('.cartList') || null; // cartList가 null일 경우 null로 설정
const cartEmpty = document.querySelector('.cartEmpty') || null; // cartEmpty가 null일 경우 null로 설정

icoTrash?.addEventListener('click', () => {
  // 삭제 아이콘 클릭 시 동작할 코드 작성
  console.log('아이템 삭제');

  if (cartList && cartEmpty) {
    // 장바구니 상품 숨기기
    cartList.classList.add('hidden');

    // "장바구니에 상품이 없는 경우" 메시지 표시
    cartEmpty.classList.remove('hidden');
  } else {
    console.error('필수 요소가 누락되었습니다.');
  }
});
