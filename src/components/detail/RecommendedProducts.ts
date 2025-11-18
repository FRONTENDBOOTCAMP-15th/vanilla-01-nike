class RecommendedProducts extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="w-[312px] mx-6">
      <div class="flex flex-col px-6 pt-9 pb-3">
        <h2 class="text-2xl">추천 제품</h2>

        <!-- 좌우 이동 버튼 -->
        <div class="flex gap-3 justify-end">
          <!-- 이전 버튼 -->
          <button
            type="button"
            aria-label="이전 제품 보기"
            class="w-12 h-12 bg-[#f5f5f5] rounded-3xl cursor-pointer justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="m-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.5256 18.9662L8.55859 12.0002L15.5256 5.0332"
                stroke="#CACACB"
                stroke-width="1.5"
              />
            </svg>
          </button>

          <!-- 다음 버튼 -->
          <button
            type="button"
            aria-label="다음 제품 보기"
            class="w-12 h-12 bg-[#e5e5e5] rounded-3xl cursor-pointer justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="m-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8.47461 5.0338L15.4406 11.9998L8.47461 18.9668"
                stroke="#111111"
                stroke-width="1.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 제품 리스트 -->
      <ul
        class="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap px-6 pb-3"
      >
        <li class="flex flex-col gap-3 shrink-0 text-sm pb-10">
          <img class="w-[196px] h-[196px] bg-gray-50 rounded-sm" />
          <p>나이키 줌 보메로 5</p>
          <p class="text-[#707072]">남성 신발</p>
          <p>189,000 원</p>
        </li>

        <li class="flex flex-col gap-3 shrink-0 text-sm pb-10">
          <img class="w-[196px] h-[196px] bg-gray-50 rounded-sm" />
          <p>나이키 클럽</p>
          <p class="text-[#707072]">언스트럭처 데님 캡</p>
          <p>39,000 원</p>
        </li>
      </ul>
    </section>
  `;
  }
}

customElements.define('recommended-products', RecommendedProducts);
