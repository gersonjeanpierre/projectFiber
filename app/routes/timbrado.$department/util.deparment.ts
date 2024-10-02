export function getAfterUnderscoreText(texto: string): string {
  const partes = texto.split("_");
  return partes[1]; // Retorna la parte después del guion bajo
}

export function normalizeRouteId(texto: string): string {
  return texto.replace("RUTA #", "ruta").toLowerCase();
}
