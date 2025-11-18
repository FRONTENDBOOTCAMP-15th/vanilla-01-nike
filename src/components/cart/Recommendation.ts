class Recommendation extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="recommendedProduct">
      <h2>추천 제품</h2>
      <div>
        <img src="NikeTest.png" alt=양말" />
        <p class="name">나이키 에브리데이 플러스</p>
        <p class="detials">쿠션 크루 삭스(2켤레)</p>
        <p class="price">29,000원</p>
      </div>
    </section>
  `;
  }
}

customElements.define('cart-', Recommendation);
