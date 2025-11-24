// ID 값 가져오기
export function getProductIdFromUrl(): string | null {
  const params = new URLSearchParams(location.search);
  const idParam = params.get('_id') ?? params.get('id');
  return idParam ?? '13'; // id 값이 없다면 임의로 13 부여
}
