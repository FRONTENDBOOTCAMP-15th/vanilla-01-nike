class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM에 연결될 때 호출되는 메소드
  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  connectedCallback() {
    this.render();
  }

  // UI를 렌더링
  render() {
    this.innerHTML = `
    <!-- Modal 창 -->
      <div id="Pop" class="absolute z-50 hidden">
        <section class="w-[310px] shrink-0 ml-[50px] pb-[162px] bg-white">
          <div class="pl-[42px]">
            <a href="javascript:ViewLayer();" class="flex justify-end p-[18px]">
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14.5" cy="14.5" r="14.5" fill="#E5E5E5" />
                <path d="M6 7L21.9995 23" stroke="#111111" stroke-width="2" />
                <path d="M22 7L6.0005 23" stroke="#111111" stroke-width="2" />
              </svg>
            </a>
            <button
              class="text-[16px] rounded-4xl px-3.5 py-1.5 my-[19px] mr-4 bg-black"
            >
              <a href="/src/components/Login/authority.html" class="text-white"
                >가입하기</a
              >
            </button>
            <button
              class="text-[16px] rounded-4xl px-3.5 py-1.5 my-[19px] mr-4 bg-white border-gray-300 border"
            >
              <a href="/src/components/Login/log-in.html" class="text-black"
                >로그인</a
              >
            </button>
          </div>
          <div>
            <div id="container1" class="m-0 flex flex-col pl-[42px]">
              <li class="flex font-normal justify-between items-center py-4">
                <details class="font-medium text-2xl/normal">
                  <summary class="text-2xl list-none flex items-center gap-2">
                    <a href="/src/pages/itemList" class="font-semibold">New & Featured</a>
                  </summary>
                </details>
                <svg
                  class="mr-5 float-end justify-end items-start h-6 w-6 shrink-0"
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.707031 0.707031L9.19231 9.19231L0.707031 17.6776"
                    stroke="#111111"
                    stroke-width="2"
                  />
                </svg>
              </li>
              <li class="flex font-normal justify-between items-center py-4">
                  <summary class="text-2xl list-none flex items-center gap-2">
                    <a href="/src/pages/itemList" class="font-semibold">Man</a>
                  </summary>
                <svg
                  class="mr-5 float-end justify-end items-start h-6 w-6 shrink-0"
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.707031 0.707031L9.19231 9.19231L0.707031 17.6776"
                    stroke="#111111"
                    stroke-width="2"
                  />
                </svg>
              </li>
              <li class="flex font-normal justify-between items-center py-4">
                  <summary class="text-2xl list-none flex items-center gap-2">
                    <a href="/src/pages/itemList" class="font-semibold">Women</a>
                  </summary>
                <svg
                  class="mr-5 float-end justify-end items-start h-6 w-6 shrink-0"
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.707031 0.707031L9.19231 9.19231L0.707031 17.6776"
                    stroke="#111111"
                    stroke-width="2"
                  />
                </svg>
              </li>
              <li class="flex font-normal justify-between items-center py-4">
                  <summary class="text-2xl list-none flex items-center gap-2">
                    <a href="/src/pages/itemList" class="font-semibold">Kids</a>
                  </summary>
                <svg
                  class="mr-5 float-end justify-end items-start h-6 w-6 shrink-0"
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.707031 0.707031L9.19231 9.19231L0.707031 17.6776"
                    stroke="#111111"
                    stroke-width="2"
                  />
                </svg>
              </li>
              <li class="flex font-normal justify-between items-center py-4">
                  <summary class="text-2xl list-none flex items-center gap-2">
                    <a href="/src/pages/itemList" class="font-semibold">Sale</a>
                  </summary>
                <svg
                  class="mr-5 float-end justify-end items-start h-6 w-6 shrink-0"
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.707031 0.707031L9.19231 9.19231L0.707031 17.6776"
                    stroke="#111111"
                    stroke-width="2"
                  />
                </svg>
              </li>
            </div>
            <div id="container2" class="mt-7">
              <div
                class="flex w-[320px] py-2 pr-[174px] pl-[39px] items-center gap-3"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.49 16.5V15M7.5 8.25C7.50027 7.71339 7.64447 7.18668 7.91756 6.72476C8.19065 6.26284 8.58264 5.88262 9.05266 5.62373C9.52269 5.36485 10.0536 5.23678 10.5899 5.25286C11.1263 5.26895 11.6485 5.4286 12.1022 5.71519C12.5559 6.00177 12.9244 6.4048 13.1693 6.88225C13.4142 7.35971 13.5266 7.89411 13.4947 8.42978C13.4628 8.96544 13.2878 9.48274 12.988 9.92777C12.6882 10.3728 12.2745 10.7293 11.79 10.96C11.01 11.33 10.5 12.12 10.5 12.99V13.5M20.25 10.5C20.25 15.885 15.885 20.25 10.5 20.25C5.115 20.25 0.75 15.885 0.75 10.5C0.75 5.115 5.115 0.75 10.5 0.75C15.885 0.75 20.25 5.115 20.25 10.5Z"
                    stroke="#111111"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                </svg>
                <p><a href="">고객센터</a></p>
              </div>
              <div
                class="flex w-[320px] py-2 pr-[174px] pl-[39px] items-center gap-3"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.25 5.25V3C5.25 2.40326 5.48705 1.83097 5.90901 1.40901C6.33097 0.987053 6.90326 0.75 7.5 0.75H10.5C11.0967 0.75 11.669 0.987053 12.091 1.40901C12.5129 1.83097 12.75 2.40326 12.75 3C12.75 3.59674 12.5129 4.16903 12.091 4.59099C11.669 5.01295 11.0967 5.25 10.5 5.25H0.75V13.5C0.75 14.4946 1.14509 15.4484 1.84835 16.1517C2.55161 16.8549 3.50544 17.25 4.5 17.25H13.5C14.4946 17.25 15.4484 16.8549 16.1517 16.1517C16.8549 15.4484 17.25 14.4946 17.25 13.5V5.25H14.5"
                    stroke="#111111"
                    stroke-width="1.5"
                  />
                </svg>
                <p><a href="">장바구니</a></p>
              </div>
              <div
                class="flex w-[320px] py-2 pr-[174px] pl-[39px] items-center gap-3"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 10.5V3.5C9 1.76 10.01 0.75 11.25 0.75H15.64L17.25 6.75M17.25 6.75H0.75M17.25 6.75V17.25H0.75V6.75M0.75 6.75L2.36 0.75H7.5"
                    stroke="#111111"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                </svg>
                <p><a href="">주문</a></p>
              </div>
              <div
                class="flex w-[320px] py-2 pr-[174px] pl-[39px] items-center gap-3"
              >
                <svg
                  width="21"
                  height="15"
                  viewBox="0 0 21 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 0.75V12C18.75 13.24 17.74 14.25 16.5 14.25H4.5C3.26 14.25 2.25 13.24 2.25 12V0.75M6.75 14V6.75H14.25V14M10.5 6.75V14M0 0.75H21"
                    stroke="#111111"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                </svg>
                <p><a href="">매장 찾기</a></p>
              </div>
            </div>
          </div>
        </section>
        <!-- <div class="w-[360px] h-[816px] bg-gray-600 opacity-30 float-start"></div> -->
      </div>
    `;
  }
}

// HeaderComponent를 <lion-header> 태그로 정의
customElements.define('fsc-modal', HeaderComponent);
