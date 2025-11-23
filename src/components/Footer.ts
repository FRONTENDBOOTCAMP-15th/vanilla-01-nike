class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM에 연결될 때 호출되는 메소드

  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  connectedCallback() {
    this.render();
    this.setupAccordion(); // 아코디언 이벤트를 설정하는 메소드 호출
  }

  // UI를 렌더링
  render() {
    this.innerHTML = `
    <footer class="m-0 py-12 px-6 w-[360px] flex flex-col bg-white">
    <div id="container1" class="m-0 flex flex-col">
      <div class="border-b border-gray-300">
        <button class="w-full flex justify-between items-center py-4 pl-3 hover:bg-gray-200 accordion-btn">
          <span class="text-[14px] font-medium">안내</span>
              <svg
                class="float-end justify-end items-start h-6 w-6 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9662 8.47559L12.0002 15.4426L5.0332 8.47559"
                  stroke="#111111"
                  stroke-width="1.5"
                />
              </svg>
        </button>
        <div class="hidden flex flex-col gap-3 accordion-content py-3 pl-4 text-gray-400 text-sm font-bold">
          <p> 멤버가입</p>
          <p> 매장찾기</p>
          <p> 제품 가이드</p>
          <p> 러닝화 가이드</p>
        </div>
      </div>
      <div class="border-b border-gray-300">
        <button class="w-full flex justify-between items-center py-4 pl-3 hover:bg-gray-200 accordion-btn">
          <span class="text-[14px] font-medium">고객센터</span>
              <svg
                class="float-end justify-end items-start h-6 w-6 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9662 8.47559L12.0002 15.4426L5.0332 8.47559"
                  stroke="#111111"
                  stroke-width="1.5"
                />
              </svg>
        </button>
        <div class="hidden flex flex-col gap-3 accordion-content py-3 pl-4 text-gray-400 text-sm font-bold">
          <p> 주문배송조회</p>
          <p> 반품 정책</p>
          <p> 결제 방법</p>
          <p> 공지사항</p>
          <p> 문의하기</p>
        </div>
      </div>
      <div class="border-b border-gray-300">
        <button class="w-full flex justify-between items-center py-4 pl-3 hover:bg-gray-200 accordion-btn">
          <span class="text-[14px] font-medium">회사소개</span>
            <svg
              class="float-end justify-end items-start h-6 w-6 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9662 8.47559L12.0002 15.4426L5.0332 8.47559"
                stroke="#111111"
                stroke-width="1.5"
              />
            </svg>
        </button>
        <div class="hidden flex flex-col gap-3 accordion-content py-3 pl-4 text-gray-400 text-sm font-bold">
          <p> About Nike</p>
          <p> 소식</p>
          <p> 채용</p>
          <p> 투자자</p>
          <p> 지속가능성</p>
          <p> 코칭</p>
          <p> 신고하기</p>
        </div>
      </div>
    </div>
      <div
        id="container2"
        class="py-16 text-[14px] flex flex-col gap-2.5 text-gray-500"
      >
        <p>© 2024 Nike, Inc. All Rights Reserved</p>
        <p>이용약관</p>
        <p class="font-bold">개인정보처리방침</p>
        <p>위치정보이용약관</p>
        <p>영상정보처리기기 운영 방침</p>
      </div>

      <div
        id="container3"
        class="font-sans border-t border-gray-500 font-medium pt-6"
      >
        <p class="text-[13px] text-gray-400 leading-6">
          (유)나이키코리아 대표 Kimberlee Lynn Chang<br />
          Mendes, 킴벌리 린 창 멘데스 | 서울 강남구 테헤란로<br />
          152 강남파이낸스센터 30층 | 통신판매업신고번호<br />
          2011-서울강남-03461 | 등록번호 220-88-09068<br />
          <span class="underline">사업자 정보 확인</span><br />
          고객센터 전화 문의 <span class="underline">080-022-0182</span> FAX
          02-6744-5880 | 이메일
          <span class="underline">service@nike.co.kr</span> |<br />
          호스팅서비스사업자 (유)나이키코리아
        </p>
      </div>
    </footer>
    `;
  }

  // 아코디언 이벤트를 설정하는 새로운 메소드
  setupAccordion(): void {
    // this.querySelectorAll()을 사용하여 컴포넌트 내부의 버튼 c찾기
    const accordionBtns = this.querySelectorAll(
      '.accordion-btn',
    ) as NodeListOf<HTMLButtonElement>;

    accordionBtns.forEach((btn: HTMLButtonElement) => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('svg'); // SVG는 Element로 간주

        // 5. 타입 가드(Type Guard)를 사용하여 null 체크
        if (content && icon) {
          // 펼쳐짐 토글
          content.classList.toggle('hidden');

          // 아이콘 회전
          icon.classList.toggle('rotate-180');
        }
      });
    });
  }
}

// HeaderComponent를 <lion-header> 태그로 정의
customElements.define('fsc-footer', HeaderComponent);
