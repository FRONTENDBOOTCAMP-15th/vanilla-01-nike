class Cart extends HTMLElement {
  connectedCallback() {
    this.render();
  }

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
            <div class="shrink-0 w-[154px] h-[154px] bg-amber-200"></div>
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
                  <td class="w-1/2 underline text-[#707072]">275</td>
                  <td class="w-1/2">
                    <button class="w-[30px] h-[30px] text-[#a6a6a6]" type="button">-</button>
                    <span class="text-[14px] text-[#707072]">1</span>
                    <button class="w-[30px] h-[30px] text-[#333]" type="button">+</button>
                  </td>
                </tr>
              </table>
              <div class="cartButtons flex mt-7.5">
                <span class="w-6 h-6 bg-amber-200"></span>
                <button class="deleteButton w-6 h-6 ml-4 bg-amber-200"></button>
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

customElements.define('cart-carttotal', Cart);
