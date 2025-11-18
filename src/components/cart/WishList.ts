class WishList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="wrap bg-white mx-auto w-[360px]">
      <section class="wishList mx-auto w-[328px] pt-10 pb-10 border-t border-t-[#e5e5e5]">
        <h2 class="text-2xl font-medium leading-9 text-[#111]">위시 리스트</h2>
        <div class="wishWrap mt-11">
          <div class="wish flex leading-7">
            <div class="shrink-0 w-[154px] h-[154px] bg-amber-200"></div>
              <div class="productInfo w-full ml-3">
                <div class="flex col-gap-2font-medium text-[#111]">
                  <p class="name w-16">나이키 줌 보메로 5</p>
                  <p class="price ml-5">189,000원</p>
                </div>
                <div>
                  <p class="target text-[#707072]">남성 신발</p>
                  <p class="text-[#707072]">사이즈<span class="ml-2.5 underline">275</span></p>
                  <button type="button" class="block cursor-pointer h-11 px-5 py-2 mt-3 border border-[#e5e5e5] rounded-[22px] text-[#111]">장바구니에 추가</button>
                </div>
            </div>
          </div>
          <div class="wish flex mt-[62px] leading-7">
            <div class="wish flex leading-7">
            <div class="shrink-0 w-[154px] h-[154px] bg-amber-200"></div>
              <div class="productInfo w-full ml-3">
                <div class="flex col-gap-2font-medium text-[#111]">
                  <p class="name w-16">나이키 줌 보메로 5</p>
                  <p class="price ml-5">189,000원</p>
                </div>
                <div>
                  <p class="target text-[#707072]">남성 신발</p>
                  <p class="text-[#707072]">사이즈<span class="ml-2.5 underline">275</span></p>
                  <button type="button" class="block cursor-pointer h-11 px-5 py-2 mt-3 border border-[#e5e5e5] rounded-[22px] text-[#111] ">장바구니에 추가</button>
                </div>
            </div>
          </div>
        </div>
        <button type="button" class="moreButton mt-[33px] text-[14px] text-[#707072] underline" >위시리스트 상품 모두 보기</button>
      </section>
    </div>
  `;
  }
}

customElements.define('cart-wishlist', WishList);
