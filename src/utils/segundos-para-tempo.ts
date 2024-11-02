export function segundosParaTempo(segundos: number): string {
  const zeroAEsquerda = (n: number) => Math.floor(n).toString().padStart(2, '0');

  const horas = zeroAEsquerda((segundos / 3600));
  const minutos = zeroAEsquerda((segundos % 3600) / 60);
  const segundosRestantes = zeroAEsquerda(segundos % 60);

  return `${horas}:${minutos}:${segundosRestantes}`
}
