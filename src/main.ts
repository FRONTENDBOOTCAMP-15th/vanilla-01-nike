import './style.css';
class HeaderComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM에 연결될 때 호출되는 메소드
  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  connectedCallback() {
    this.render();
  }

  // UI를 렌더링
  render() {
    this.innerHTML = `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>nike-main</title>
    <style>
      body {
        font-family: sans-serif;
      }
      article {
        scrollbar-width: none;
      }
    </style>
    <!-- <link rel="stylesheet" href="/src/components/main/main.css" /> -->
  </head>
  <body class="w-[360px] h-[3000px] m-0 flex flex-col font-sans">
    <div
      id="containers"
      class="flex flex-col justify-center gap-[84px] bg-white"
    >
      <section id="container1" class="pt-10 mx-6 w-[316px] h-[646.23px]">
      <img src="/src/assets/img/NIKE-main-1.png" class="w-[312px] h-[426px] object-cover"> 
        <h1 class="text-2xl font-medium leading-9 my-6">워크아웃 에센셜</h1>
        <button class="bg-black rounded-4xl text-white py-1.5 px-4">
        <a href="/src/pages/itemList">
         구매하기
        </a>
        </button>
      </section>
      <section id="container2" class="my-3 mx-6 w-[312px] h-[496px]">
        <h1 id="title" class="text-2xl font-medium leading-9 mb-6">Featured</h1>
        <img src="/src/assets/img/NIKE-main-2.png" class="w-[312px] h-[312spx] object-cover">
        <h1 class="text-2xl font-medium leading-9 my-6">워크아웃 에센셜</h1>
        <button class="bg-black rounded-4xl text-white py-1.5 px-4">
          <a href="/src/pages/itemList">
         구매하기
        </a>
        </button>
      </section>
      <section
        id="container3"
        class="w-[336px] h-[640px] flex flex-col gap-4 my-3 ml-6"
      >
        <div class="flex flex-row justify-between items-end /*gap-[79px]*/">
          <h1 class="text-2xl font-medium leading-9 mt-0">나이키 멤버십</h1>
          <p class="text-[16px] font-medium leading-7 pr-6">
          <a href="/src/components/Login/authority.html" class=" hover:bg-gray-950/10">
         멤버 가입하기
        </a></p>
        </div>
        <article
          id="items"
          class="h-[640px] flex flex-row overflow-y-scroll overflow-x-auto overflow-visible gap-2"
        >
          <article class="item1">
          <div class="w-[300px] h-[375px]">
          <img src="/src/assets/img/NIKE-main-3-1.png" class="w-[300px] h-[375px] object-cover">
          </div>
            <p class="text-[16px] font-medium leading-7 mt-4">
              스포츠 & 웰니스 앱
            </p>
            <h2 class="text-[20px] font-medium leading-[35px] mt-4">
              언제 어디서든 운동하기
            </h2>
            <button class="bg-black rounded-4xl text-white py-1.5 px-4 mt-4">
            <a href="/src/components/Login/log-in.html">
              함께 운동하기
              </a>
            </button>
          </article>
          <article class="item2">
            <div class="w-[300px] h-[375px]">
          <img src="/src/assets/img/NIKE-main-3-2.png" class="w-[300px] h-[375px] object-cover">
          </div>
            <p class="text-[16px] font-medium leading-7 mt-4">
              나이키 트레일 러닝
            </p>
            <h2 class="text-[20px] font-medium leading-[35px] mt-4">
              새로운 모험으로 이끌어 주는 아이템
            </h2>
            <button class="bg-black rounded-4xl text-white py-1.5 px-4 mt-4">
            <a href="/src/components/Login/log-in.html">
              함께 운동하기
              </a>
            </button>
          </article>
          <article class="item3">
            <div class="w-[300px] h-[375px]">
          <img src="/src/assets/img/NIKE-main-3-3.png" class="w-[300px] h-[375px] object-cover">
          </div>
            <p class="text-[16px] font-medium leading-7 mt-4">나이키 축구</p>
            <h2 class="text-[20px] font-medium leading-[35px] mt-4">
              경기 중 독보적인 존재감을 드러낼<br />
              아이템
            </h2>
            <button class="bg-black rounded-4xl text-white py-1.5 px-4 mt-4">
            <a href="/src/components/Login/log-in.html">
              함께 운동하기
              </a>
            </button>
          </article>
        </article>
      </section>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
    `;
  }
}

// HeaderComponent를 <lion-header> 태그로 정의
customElements.define('fsc-main', HeaderComponent);
