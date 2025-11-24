export const CATEGORY_LABELS: Record<string, string> = {
  PC01: '남성',
  PC0102: '남성 신발',
  PC0103: '남성 신발',
  PC02: '여성',
  PC0201: '여성 신발',
  PC0203: '여성 의류',
  PC03: '베이비',
  PC0301: '베이비 신발',
};

export function getCategoryNames(codes: string[]): string[] {
  return codes.map(code => CATEGORY_LABELS[code] ?? code);
}
