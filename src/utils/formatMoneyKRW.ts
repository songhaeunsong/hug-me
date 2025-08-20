export function formatMoneyKRW(value: number): string {
  if (value >= 100_000_000) {
    const eok = Math.floor(value / 100_000_000);
    const man = Math.floor((value % 100_000_000) / 10_000);
    const il = Math.floor(value % 10_000);

    if (il === 0) return man === 0 ? `${eok}억원` : `${eok}억 ${man}만원`;
    else return man === 0 ? `${eok}억 ${il}원` : `${eok}억 ${man}만 ${il}원`;
  } else if (value >= 10_000) {
    const man = Math.floor(value / 10_000);
    const il = Math.floor(value % 10_000);
    return il === 0 ? `${man}만원` : `${man}만 ${il}원`;
  }
  return `${value}원`;
}
