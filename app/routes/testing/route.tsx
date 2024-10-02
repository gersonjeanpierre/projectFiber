import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import RouteContent from "~/routes/testing.$department.$routeId.$cto/RouteContent";
import { transformData } from "~/components/timbrado/transformData";
import {
  getAllKeys,
  getDataByKey,
  saveDataByKey,
} from "~/components/services/indexedDBService";
import { Button } from "~/components/ui/button";
import { Link, useNavigate } from "@remix-run/react";
import { normalizeRouteText } from "./utils";
import { Outlet } from "@remix-run/react";
import { ResetIcon } from "@radix-ui/react-icons";

const Timbrado = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [filename, setFilename] = useState<string>("");
  const [keys, setKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      await loadKeys();
      if (keys.length > 0) {
        await loadDataFromDB(keys[keys.length - 1]);
      }
    };
    initializeData();
  }, []);

  const loadKeys = async () => {
    try {
      const dbKeys = await getAllKeys();
      setKeys(dbKeys);
      return dbKeys;
    } catch (error) {
      console.error("Error al cargar las claves de IndexedDB:", error);
      return [];
    }
  };

  const loadDataFromDB = async (key: string) => {
    try {
      const dataFromDB: any[] = (await getDataByKey(key)) as any[];
      if (dataFromDB) {
        setRoutes(dataFromDB);
        setFilename(key);
      }
    } catch (error) {
      console.error("Error al cargar datos de IndexedDB:", error);
    }
  };

  const handleKeySelect = async (key: string) => {
    await loadDataFromDB(key);
    // console.log(routes.map((ruta) => ruta.departamento));
    // console.log(routes.map((ruta) => ruta.rutas));
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const fileData = await file.arrayBuffer();
    const name = file.name.split(".")[0];

    try {
      const dataRuta = transformData(fileData);
      await saveDataByKey(name, dataRuta);
      setRoutes(dataRuta);
      setFilename(name);
      await loadKeys();
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="flex gap-3">
        <h1 className="text-4xl mb-4 font-bold">Subir el Excel de rutas</h1>
        <Button onClick={() => navigate(-1)}>
          <ResetIcon className="mr-2 h-4 w-4" />
          Regresar
        </Button>
      </div>

      <Input
        type="file"
        onChange={handleFileUpload}
        accept=".xlsx"
        className="mb-4"
      />
      <div className="mb-4">
        <h2 className="text-2xl mb-2 font-semibold">Archivos guardados:</h2>
        <div className="flex flex-wrap gap-2">
          {keys.map((key) => (
            <Button
              key={key}
              onClick={() => handleKeySelect(key)}
              variant={filename === key ? "default" : "outline"}
            >
              {key}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-auto h-auto">
        <div className="flex gap-2 mb-3">
          {routes
            .map((ruta) => ruta.departamento)
            .map((dept: string, index: number) => (
              <Button
                key={index}
                onClick={() => navigate(`/testing/${filename}_${dept}`)}
              >
                {dept}
              </Button>
            ))}
        </div>
        {/* OUTLET */}
        <Outlet context={{ routes }} />
      </div>
    </div>
  );
};

export default Timbrado;
