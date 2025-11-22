// ID 값 가져오기
export function getProductIdFromUrl(): string | null {
  const id = new URLSearchParams(location.search).get('_id');
  return id ?? '13'; // id 값이 없다면 임의로 13 부여
}
