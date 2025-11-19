import itemListImg1 from '../../assets/img/NIKE-main-3-1.png';

class itemList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.updateResultsCount();
  }

  private async updateResultsCount() {
    const items = this.querySelectorAll('.productGrid li');
    const count = items.length;

    const resultsText = this.querySelector('.resultsText');
    if (resultsText) {
      resultsText.textContent = `${count}개의 결과`;
    }
  }

  render() {
    this.innerHTML = `
    <body class="bg-white box-border">
    <main class="w-full py-20">
      <section
        aria-labelledby="newProducts"
        class="sectionWrapper w-full text-[#111111]"
      >
        <div class="sectionHeader">
          <h1 class="newProducts pt-[13px] pb-7 pl-5 text-xl font-medium">
            신제품
          </h1>
        </div>

        <!-- 카테고리 네비게이션 -->
        <nav
          aria-label="기본 카테고리"
          class="categoryNav w-full pl-4 mt-4 mb-7"
        >
          <ul
            class="categoryNavList flex gap-8 text-[#111111] text-base font-medium px-1 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
            role="list"
          >
            <li>
              <a href="#">신발</a>
            </li>
            <li>
              <a href="#">탑 & 티셔츠</a>
            </li>
            <li>
              <a href="#">후디 & 크루</a>
            </li>
            <li>
              <a href="#">재킷 & 베스트</a>
            </li>
            <li>
              <a href="#">팬츠 & 타이츠</a>
            </li>
            <li>
              <a href="#">쇼츠</a>
            </li>
            <li>
              <a href="#">스포츠 브라</a>
            </li>
            <li>
              <a href="#">트랙수트</a>
            </li>
            <li>
              <a href="#">점프수트 & 롬퍼스</a>
            </li>
            <li>
              <a href="#">스커트 & 드레스</a>
            </li>
            <li>
              <a href="#">양말</a>
            </li>
            <li>
              <a href="#">용품</a>
            </li>
          </ul>
        </nav>

        <!-- 검색 결과 + 필터 -->
        <div class="toolbar flex items-center justify-between">
          <p
            class="resultsText ml-5 font-normal text-[#707072]"
            aria-live="polite"
          >
            
          </p>

          <button
            type="button"
            class="filterButton inline-flex items-center gap-1.5 py-2 px-5 mr-5 mb-3 rounded-4xl border border-solid border-[#cacacb] bg-transparent text-base text-[#111111] cursor-pointer"
            aria-haspopup="dialog"
            aria-controls="filterPanel"
          >
            <span class="filterText font-medium">필터</span>
            <span
              class="filterButtonIcon inline-block relative w-[18px] h-[25px]"
              aria-hidden="true"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8.25H10M4.75 8.25H3"
                  stroke="#111111"
                  stroke-width="1.5"
                />
                <path
                  d="M7.5 6C7.20453 6 6.91194 6.0582 6.63896 6.17127C6.36598 6.28434 6.11794 6.45008 5.90901 6.65901C5.70008 6.86794 5.53434 7.11598 5.42127 7.38896C5.3082 7.66194 5.25 7.95453 5.25 8.25C5.25 8.54547 5.3082 8.83806 5.42127 9.11104C5.53434 9.38402 5.70008 9.63206 5.90901 9.84099C6.11794 10.0499 6.36598 10.2157 6.63896 10.3287C6.91194 10.4418 7.20453 10.5 7.5 10.5C8.09674 10.5 8.66903 10.2629 9.09099 9.84099C9.51295 9.41903 9.75 8.84674 9.75 8.25C9.75 7.65326 9.51295 7.08097 9.09099 6.65901C8.66903 6.23705 8.09674 6 7.5 6Z"
                  stroke="#111111"
                  stroke-width="1.5"
                />
                <path
                  d="M3 15.75H13.75M18.75 15.75H21"
                  stroke="#111111"
                  stroke-width="1.5"
                />
                <path
                  d="M16.5 13.5C15.9033 13.5 15.331 13.7371 14.909 14.159C14.4871 14.581 14.25 15.1533 14.25 15.75C14.25 16.3467 14.4871 16.919 14.909 17.341C15.331 17.7629 15.9033 18 16.5 18C17.0967 18 17.669 17.7629 18.091 17.341C18.5129 16.919 18.75 16.3467 18.75 15.75C18.75 15.1533 18.5129 14.581 18.091 14.159C17.669 13.7371 17.0967 13.5 16.5 13.5Z"
                  stroke="#111111"
                  stroke-width="1.5"
                />
              </svg>
            </span>
          </button>
        </div>

        <!-- 상품 10개 -->
        <ul
          class="productGrid grid grid-cols-2 gap-x-2.5 gap-y-1.5"
          style="list-style: none"
        >
          <!-- 1 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}" alt="테이텀 2 PF"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  테이텀 2 PF
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  농구화
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  149,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 2 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 줌 보메로 5"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 줌 보메로 5
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  여성 신발
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  209,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 3 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 줌 보메로 5"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 줌 보메로 5
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  여성 신발
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  209,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 4 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 에어맥스 SC 트렌드"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 에어맥스 SC 트렌드
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  여성 신발
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  119,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 5 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 스우시 1"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 스우시 1
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  베이비 신발
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  69,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 6 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 머큐리얼 베이퍼 16 프로"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 머큐리얼 베이퍼 16 프로
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  TF 로우 탑 축구화
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  149,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 7 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 티엠포 레전드 10 프로"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 티엠포 레전드 10 프로
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  인조 잔디 로우 탑 축구화
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  159,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 8 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 팬텀 GX 2 프로"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 팬텀 GX 2 프로
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  TF 로우 탑 축구화
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  159,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 9 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 클럽"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 클럽
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  언스트럭처 데님 캡
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  39,000 원
                </p>
              </div>
            </article>
          </li>

          <!-- 10 -->
          <li>
            <article class="productItem">
              <a href="../../src/pages/detail" class="productLink">
                <figure class="productMedia pt-[100%] relative">
                  <img src="${itemListImg1}"
                    alt="나이키 에이펙스"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </figure>
              </a>
              <div class="productInfo py-3 px-4">
                <p
                  class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold"
                >
                  신제품
                </p>
                <h2 class="productName mb-0.5 text-[14px] font-semibold">
                  나이키 에이펙스
                </h2>
                <p
                  class="productCategory text-[#707072] text-[14px] font-normal"
                >
                  데님 버킷 햇
                </p>
                <p class="productColor text-[#707072] text-[14px] font-normal">
                  1개 색상
                </p>
                <p
                  class="productPrice mt-1 text-base font-medium text-[#111111]"
                >
                  45,000 원
                </p>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </main>
  </body>
  `;
  }
}

customElements.define('item-list', itemList);
