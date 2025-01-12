export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
} 