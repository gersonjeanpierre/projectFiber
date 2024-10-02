export const cleanAndDeduplicateArray = (inputArray: string[]): string[] => {
  // Utilizar un Set para eliminar duplicados y un map para limpiar cada string
  const cleanedArray = inputArray.map(
    (item) => item.replace(/\s+/g, " ").trim() // Reemplaza múltiples espacios en blanco, incluidas tabulaciones y saltos de línea, con un solo espacio
  );

  // Convertir el array limpio en un Set para eliminar duplicados, y luego volver a convertirlo en un array
  return Array.from(new Set(cleanedArray));
};

export const cleanCell = (cell: string): string => {
  // add case undefined
  if (!cell) {
    return "";
  }
  // Reemplaza múltiples espacios en blanco, incluidas tabulaciones y saltos de línea, con un solo espacio

  return cell.replace(/\s+/g, " ").trim();
};
export const transposeMatrix = (matrix: any[][]): any[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

export const transformData = (data: any): any => {
  const departments = data.SheetNames;
  // Nueva lista de departamentos

  const dataRuta: any[] = [];

  departments.forEach((department) => {
    let rutas: any[] = [];
    const jsonData: any[] = sheet_to_json(data.Sheets[`${department}`], {
      header: 1,
    });
    const t = transposeMatrix(jsonData);

    t.map((row) => {
      let _ctos: string[] = [];
      let ctoState: any[] = [];
      for (let i = 3; i < row.length; i++) {
        _ctos.push(row[i]);
      }
      _ctos.map((cto) => {
        ctoState.push({
          cto: cto,
          state: "NO TIMBRADO",
          observation: "",
        });
      });
      let ruta = cleanCell(row[0]);
      let gestor = cleanCell(row[1]);
      let tecnico = cleanCell(row[2]).toUpperCase();
      rutas.push({
        ruta: ruta,
        gestor: gestor,
        tecnico: tecnico,
        ctos: ctoState,
      });
    });

    dataRuta.push({
      departamento: department,
      rutas: rutas,
    });
  });

  return dataRuta;
};
