class SizeSelector extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="w-[312px] mx-6 mb-8">
      <div class="flex justify-between items-center mb-2">
        <p class="">사이즈 선택</p>
        <p class="text-gray-600">사이즈 가이드</p>
      </div>
      <div class="flex flex-wrap justify-center gap-1.75 mt-2.25">
        <button
          type="button"
          aria-labelledby="sizeButton"
          class="py-2.5 px-3.5 border cursor-pointer rounded-sm"
        >
          250
        </button>
      </div>
    </div>
  `;
  }
}

customElements.define('size-selector', SizeSelector);
