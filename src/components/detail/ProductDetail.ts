class ProductDetail extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="w-[312px] mx-6">
    <h2 class="sr-only">상품 설명</h2>
      <p class="mb-7">
        경기 종료 휘슬이 울릴 때까지는 끝난 것이 아닙니다. 테이텀 2와 함께
        여유로운 에너지로 경기를 즐겨보세요. 무거운 고무 소재의 사용을 제한하여
        더욱 가벼운 착화감을 선사합니다. 전체적으로 적용된 나이키 에어 스트로벨
        유닛은 빠르게 방향을 바꿀 수 있도록 도와주며, 견고한 프레임과 발에
        밀착되는 지지력 있는 폼이 어우러져 고정력 좋은 착화감을 선사합니다.
      </p>
      <ul class="list-disc list-outside pl-3 ml-4 flex flex-col gap-1 mb-8.5">
        <li>현재 컬러: 라이트 지트론/오로라 그린/ 아토믹 핑크/세일</li>
        <li>스타일 번호: FJ6458-700</li>
      </ul>
      <a href="/" class="underline decoration-2 underline-offset-8"
        >상품 상세 정보 보기</a
      >
    </section>
  `;
  }
}

customElements.define('product-detail', ProductDetail);
