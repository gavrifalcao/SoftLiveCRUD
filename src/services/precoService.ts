export function handlePrecoChange(value: string, setPreco: (v: string) => void): void {
  let v = value.replace(/[^0-9,]/g, '');
  const parts = v.split(',');
  if (parts.length > 2) {
    v = parts[0] + ',' + parts[1];
  }
  if (parts[1]?.length > 2) {
    v = parts[0] + ',' + parts[1].slice(0, 2);
  }
  setPreco(v);
}

export function precoToNumber(str?: string): number {
  if (!str) return 0;
  return parseFloat(str.replace(',', '.') || '0');
}
