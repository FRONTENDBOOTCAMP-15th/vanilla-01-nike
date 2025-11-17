class OrderDetail extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="wrap bg-white mx-auto w-[360px]">
      <section class="orderDetails mx-auto w-[328px] pt-10 pb-10 border-t border-t-[#e5e5e5]">
        <h2 class="text-2xl font-medium leading-9 text-[#111]">주문 내역</h2>
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
      </section>
    </div>
  `;
  }
}

customElements.define('cart-orderdetail', OrderDetail);
