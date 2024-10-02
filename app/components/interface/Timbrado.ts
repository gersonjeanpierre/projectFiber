export interface TimbradoData {
  cto: string;
  borne: string;
  lineIdInicial: string;
  vnoCodeInicial: string;
  olt: string;
  slot: string;
  port: string;
  onuInicial: string;
  estadoInicial: string;
  onuFinal: string;
  estadoEnCampoInicial: string;
  estadoEnCampoFinal: string;
  potenciaAntes: number;
  potenciaDespues: number;
  potenciaCampo: number;
  lineIdFinal: string;
  vnoCodeFinal: string;
  comentario: string;
  observacion: string;
  ctoEnCampo: string;
  zona: string;
  grupo: string;
  fecha: string; // Puede usarse Date si se prefiere un objeto de fecha
  horaInicio: string; // Puede usarse Date si es un campo de tipo fecha/hora
  horaCierre: string; // Puede usarse Date si es un campo de tipo fecha/hora
  gestor: string;
}
