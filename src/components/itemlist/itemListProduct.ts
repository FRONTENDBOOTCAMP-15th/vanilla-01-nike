// 상품 카드 하나의 마크업을 생성하는 모듈
export type ProductCardData = {
  id?: string | number;
  name: string;
  price: number;
  mainImage?: string;
  isNew?: boolean;
  category?: string;
  colorVariants?: number;
};

export const createProductCard = ({
  id,
  name,
  price,
  mainImage,
  isNew,
  category,
  colorVariants,
}: ProductCardData) => {
  const flag = isNew ? '신제품' : '베스트';
  const priceText = isNaN(Number(price))
    ? '가격 정보 없음'
    : `${new Intl.NumberFormat('ko-KR').format(Number(price))} 원`;
  const colors = colorVariants ?? 1;

  return `
    <li>
      <article class="productItem">
        <a href="../../src/pages/detail" class="productLink" aria-labelledby="${
          id ?? 'product'
        }-name">
          <figure class="productMedia pt-[100%] relative">
            <img
              src="${mainImage ?? ''}"
              alt="${name}"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </figure>
        </a>
        <div class="productInfo py-3 px-4">
          <p class="productFlag mb-0.5 text-[#b40000] text-[14px] font-semibold">
            ${flag}
          </p>
          <h2 id="${id ?? 'product'}-name" class="productName mb-0.5 text-[14px] font-semibold">
            ${name}
          </h2>
          <p class="productCategory text-[#707072] text-[14px] font-normal">
            ${category ?? '카테고리'}
          </p>
          <p class="productColor text-[#707072] text-[14px] font-normal">
            ${colors}개 색상
          </p>
          <p class="productPrice mt-1 text-base font-medium text-[#111111]">
            ${priceText}
          </p>
        </div>
      </article>
    </li>
  `;
};
