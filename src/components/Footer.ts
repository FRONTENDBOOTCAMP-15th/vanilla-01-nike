class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM에 연결될 때 호출되는 메소드
  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  connectedCallback() {
    this.render();
  }

  // UI를 렌더링
  render() {
    this.innerHTML = `
    <footer class="m-0 py-12 px-6 w-[360px] flex flex-col bg-white">
      <div id="container" class="m-0 flex flex-col">
        <li
          id="notice"
          class="flex font-normal justify-between items-center py-5 border-t border-gray-300"
        >
          <details class="font-medium text-[14px]">
            <summary class="list-none flex items-center gap-2">
              <p>안내</p>
            </summary>
            <p class="py-[15px] text-[13px] font-normal text-gray-500">
              비슷한 금액의 요금이 중복 청구 된 경우 아래와 같이 생각하실 수
              있습니다.
            </p>
            <ol class="py-[15px] text-[13px] font-normal text-gray-500 p-0 m-0">
              1. 가족 또는 지인이 동일한 카드를 등록하여 사용하지 않았는지
              확인해보세요.
            </ol>
            <p class="py-[15px] text-[13px] font-normal text-gray-500">
              [고객지원 > 여정 및 요금 > 내 요금 및 수수료 검토 > 미터기 요금을
              중복으로 결제하였습니다]
            </p>
          </details>
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
        </li>
        <li
          id="notice"
          class="flex font-normal justify-between items-center py-5 border-t border-gray-300"
        >
          <details class="font-medium text-[14px]">
            <summary class="list-none flex items-center gap-2">
              <p>고객센터</p>
            </summary>
            <p class="py-[15px] text-[13px] font-normal text-gray-500">
              비슷한 금액의 요금이 중복 청구 된 경우 아래와 같이 생각하실 수
              있습니다.
            </p>
            <ol class="py-[15px] text-[13px] font-normal text-gray-500 p-0 m-0">
              1. 가족 또는 지인이 동일한 카드를 등록하여 사용하지 않았는지
              확인해보세요.
            </ol>
            <p class="py-[15px] text-[13px] font-normal text-gray-500">
              [고객지원 > 여정 및 요금 > 내 요금 및 수수료 검토 > 미터기 요금을
              중복으로 결제하였습니다]
            </p>
          </details>
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
        </li>
        <li
          id="notice"
          class="flex font-normal justify-between items-center py-5 border-y border-gray-300"
        >
          <details class="font-medium text-[14px]">
            <summary class="list-none flex items-center gap-2">
              <p>회사소개</p>
            </summary>
            <p class="py-[15px] text-[13px] font-normal text-gray-500">
              비슷한 금액의 요금이 중복 청구 된 경우 아래와 같이 생각하실 수
              있습니다.
            </p>
            <ol class="py-[15px] text-[13px] font-normal text-gray-500 p-0 m-0">
              1. 가족 또는 지인이 동일한 카드를 등록하여 사용하지 않았는지
              확인해보세요.
            </ol>
            <p class="py-[15px] text-[13px] font-normal text-gray-500">
              [고객지원 > 여정 및 요금 > 내 요금 및 수수료 검토 > 미터기 요금을
              중복으로 결제하였습니다]
            </p>
          </details>
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
        </li>
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
}

// HeaderComponent를 <lion-header> 태그로 정의
customElements.define('fsc-footer', HeaderComponent);
