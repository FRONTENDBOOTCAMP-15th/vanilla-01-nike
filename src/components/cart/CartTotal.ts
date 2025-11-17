class Cart extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="wrap bg-white mx-auto w-[360px] pl-6 pr-6">
      <section class="cart">
        <div class="cartTotal text-center">
          <h1 class="text-2xl">장바구니</h1>
          <div class="relative">
            <span class="cartCount text-gray-500">1개의 제품</span>
            <span
              class="after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-gray-400"
            ></span>
            <span class="cartPrice">189,000원</span>
          </div>
        </div>
        <!-- 장바구니에 상품이 있는 경우 -->
        <div class="cartList">
          <div class="cartDetail flex mt-10">
            <img class="size-[150px]" src="NikeTest.png" alt="운동화" />
            <div class="productInfo">
              <p class="price">189,000원</p>
              <p class="name">Nike Air Max 270</p>
              <p class="target text-gray-500">남성 신발</p>
              <table>
                <tr>
                  <td class="text-gray-500">사이즈</td>
                  <td class="text-gray-500">수량</td>
                </tr>
                <tr>
                  <td class="text-gray-500">275</td>
                  <td class="text-gray-500">
                    <button class="text-gray-500" type="button">-</button>
                    <span>1</span>
                    <button class="text-gray-500" type="button">+</button>
                  </td>
                </tr>
              </table>
              <div class="cartButtons mt-10">
                <span class="likeButton">♥</span>
                <button class="deleteButton">삭제</button>
              </div>
            </div>
          </div>

          <div class="deliveryInfo mt-10">
            <p>무료배송</p>
            <p>
              도착 예정일: 7월 27일 (토) 배송지역:
              <a href="#" class="underline">04528</a>
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
