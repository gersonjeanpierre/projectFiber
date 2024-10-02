export interface Cto {
  cto: string;
  state: string;
  observation: string;
}

export interface Route {
  ruta: string;
  gestor: string;
  tecnico: string;
  ctos: Array<Cto>;
}

export interface Department {
  departamento: string;
  rutas: Array<Route>;
}
