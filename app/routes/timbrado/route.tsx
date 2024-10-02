import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [{ title: "Timbrado" }, { name: "description", content: "Timbrado" }];
};

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { read, utils } from "xlsx";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cleanCell, transposeMatrix } from "../../components/timbrado/utils";
import RouteContent from "~/routes/testing.$department.$routeId.$cto/RouteContent";
import { transformData } from "~/components/timbrado/transformData";

interface PropsComboBox {
  value: string;
  label: string;
}

const Timbrado = () => {
  const [routes, setRoutes] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const departamentosArray: PropsComboBox[] = [];
  const gestoresArray: PropsComboBox[] = [];
  const tecnicosArray: PropsComboBox[] = [];

  const [open, setOpen] = useState(false);

  const [dataRoutes, setDataRoutes] = useState([]);

  const [department, setDepartment] = useState<string[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const dataRuta: any[] = [];
    if (!e.target.files) return;
    const file = e.target.files[0];
    /* data is an ArrayBuffer */
    const fileData = await file.arrayBuffer();

    const newDepartments: string[] = []; // Nueva lista de departamentos

    // departments.forEach((department) => {
    //   let rutas: any[] = [];
    //   const jsonData: any[] = utils.sheet_to_json(
    //     workbook.Sheets[`${department}`],
    //     {
    //       header: 1,
    //     }
    //   );
    //   const t = transposeMatrix(jsonData);

    //   t.map((row) => {
    //     let _ctos: string[] = [];
    //     let ctoState: any[] = [];
    //     for (let i = 3; i < row.length; i++) {
    //       _ctos.push(row[i]);
    //     }
    //     _ctos.map((cto) => {
    //       ctoState.push({
    //         cto: cto,
    //         state: "NO TIMBRADO",
    //         observation: "",
    //       });
    //     });
    //     let ruta = cleanCell(row[0]);
    //     let gestor = cleanCell(row[1]);
    //     let tecnico = cleanCell(row[2]).toUpperCase();
    //     rutas.push({
    //       ruta: ruta,
    //       gestor: gestor,
    //       tecnico: tecnico,
    //       ctos: ctoState,
    //     });
    //   });

    //   dataRuta.push({
    //     departamento: department,
    //     rutas: rutas,
    //   });
    //   newDepartments.push(department); // Agregar el nombre del departamento a la lista
    // });
    let dataRuta = transformData(fileData);
    // new date dd/mm/yyyy
    // const date = new Date();
    // const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    //   date.getMonth() + 1
    // ).padStart(2, "0")}-${date.getFullYear()}`;
    // LOCAL STORAGE
    // localStorage.setItem(`${formattedDate}`, JSON.stringify(dataRuta));

    console.log("DataRuta", dataRuta);
    console.log("typof", typeof dataRuta);
    // console.log(
    //   "DEPARTAMENTO",
    //   dataRuta.find((data) => data.departamento === "LIMA")
    // );
    // console.log("RUTAS", dataRuta[0].rutas);
    // console.log("CTOS", dataRuta[0].rutas[0].ctos);
    setDepartment(newDepartments);
    setDataRoutes(dataRuta); // Actualizar el estado de departamentos

    console.log("DATA", dataRoutes);
    //

    // console.log("fileData", transformData(fileData));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <Link to="/work">
          <Button>Volver</Button>
        </Link>
        <Link to="/testing">
          <Button>Testing</Button>
        </Link>
        <h1 className="text-4xl mb-4 font-bold">Subir el Excel de rutas</h1>
        <Input
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx"
          className="mb-4"
        />
        <div className=" w-auto h-auto"></div>
      </div>
    </>
  );
};

export default Timbrado;
