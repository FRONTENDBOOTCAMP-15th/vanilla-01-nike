class ProductHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="mt-20 mb-10.5">
      <section class="mx-6">
        <h1 class="text-xl">테이텀 2PF(제품 이름)</h1>
        <p class="text-base">농구화(제품 카테고리)</p>
        <p class="mt-3 mb-6">149,000원 (가격 정보(할인 정보))</p>
      </section>
      <img src="" class="w-[360px] h-[450px] bg-gray-50 mb-1" />
      <section class="flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <img src="" class="w-[125px] h-[125px] bg-gray-50 rounded-[5px]" />
        <img src="" class="w-[125px] h-[125px] bg-gray-50 rounded-[5px]" />
        <img src="" class="w-[125px] h-[125px] bg-gray-50 rounded-[5px]" />
      </section>
    </div>
  `;
  }
}

customElements.define('product-header', ProductHeader);
