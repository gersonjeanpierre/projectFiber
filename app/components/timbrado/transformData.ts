import { read, utils } from "xlsx";

interface FileData {
  fileData: ArrayBuffer;
}

// Asegúrate de que transformData acepte un ArrayBuffer y lo procese adecuadamente
export const transformData = (fileData: ArrayBuffer) => {
  // Convertir el ArrayBuffer a un libro de Excel
  const workbook = read(fileData, { type: "array" });

  const dataRuta: any[] = [];

  // Procesar cada hoja dentro del libro
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const jsonData: any = utils.sheet_to_json(sheet, { header: 1 });

    // Aquí puedes hacer las transformaciones adicionales que necesites
    // Por ejemplo, transponer la matriz
    const transposedData = transposeMatrix(jsonData);

    // Procesar la data como lo haces habitualmente
    const rutas = transposedData.map((row) => {
      let ctos = row.slice(3).map((cto) => ({
        cto: cto,
        state: "NO TIMBRADO",
        observation: "",
      }));
      return {
        ruta: cleanCell(row[0]),
        gestor: cleanCell(row[1]),
        tecnico: cleanCell(row[2]).toUpperCase(),
        ctos: ctos,
      };
    });

    dataRuta.push({
      departamento: sheetName,
      rutas: rutas,
    });
  });

  return dataRuta;
};

const cleanCell = (cell: string): string => {
  // add case undefined
  if (!cell) {
    return "";
  }
  // Reemplaza múltiples espacios en blanco, incluidas tabulaciones y saltos de línea, con un solo espacio

  return cell.replace(/\s+/g, " ").trim();
};
const transposeMatrix = (matrix: any[][]): any[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};
