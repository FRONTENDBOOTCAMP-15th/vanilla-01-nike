// ID 값 가져오기
export function getProductIdFromUrl(): string | null {
  const id = new URLSearchParams(location.search).get('_id');
  return id ?? '4'; // id 값이 없다면 임의로 4 부여
}
