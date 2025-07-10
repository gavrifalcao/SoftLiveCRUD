// src/services/precoService.ts

export function handlePrecoChange(value: string, setPreco: (v: string) => void): void {
  // Remove tudo que não for número ou vírgula
  let v = value.replace(/[^0-9,]/g, '');

  // Se mais de uma vírgula, mantém só a primeira
  const parts = v.split(',');
  if (parts.length > 2) v = parts[0] + ',' + parts[1];

  let [inteiro, decimal] = v.split(',');
  inteiro = inteiro.slice(0, 10); // Máximo 10 dígitos antes da vírgula
  decimal = decimal?.slice(0, 2); // Máximo 2 casas decimais

  // Formata milhar com ponto
  const formattedInteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const final = decimal !== undefined ? `${formattedInteiro},${decimal}` : formattedInteiro;
  setPreco(final);
}

export function precoToNumber(str?: string): number {
  if (!str) return 0;
  return parseFloat(str.replace(/\./g, '').replace(',', '.') || '0');
}
