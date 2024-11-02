export function segundosParaTempo(segundos: number): string {
  const formatarNumeroComDoisDigitos = (n: number) => Math.floor(n).toString().padStart(2, '0');

  const horas = formatarNumeroComDoisDigitos((segundos / 3600));
  const minutos = formatarNumeroComDoisDigitos((segundos % 3600) / 60);
  const segundosRestantes = formatarNumeroComDoisDigitos(segundos % 60);

  return `${horas}:${minutos}:${segundosRestantes}`
}
