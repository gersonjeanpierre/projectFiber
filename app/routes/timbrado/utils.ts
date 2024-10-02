export const normalizeRouteText = (texto: string): string => {
  return texto.replace("RUTA #", "ruta").toLowerCase();
};
