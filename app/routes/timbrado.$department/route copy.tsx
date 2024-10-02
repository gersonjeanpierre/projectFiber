import { useParams, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getDataByKey } from "../../components/services/indexedDBService"; // Función para obtener datos desde IndexedDB
import { Button } from "../../components/ui/button";
import React from "react";

const RutaDetail = () => {
  const { departament } = useParams(); // Obtén el valor dinámico desde la URL
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState<any>(null); // Estado para los datos de la ruta
  const [isLoading, setIsLoading] = useState(true); // Manejo del estado de carga

  // Cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = departament ? await getDataByKey(departament) : null; // Cargar datos de IndexedDB usando el nombre de la ruta
        if (data) {
          setRouteData(data);
        }
        console.log("params", departament);
      } catch (error) {
        console.error("Error al cargar datos de la ruta:", error);
      } finally {
        setIsLoading(false); // Finaliza la carga después de intentar obtener los datos
      }
    };

    if (departament) {
      fetchData();
    }
  }, [departament]); // Dependencia del parámetro `ruta`

  // Si aún está cargando los datos, mostrar mensaje de carga
  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  // Si no se encuentra la ruta
  if (!routeData) {
    return <div>No se encontraron datos para la ruta: {departament}</div>;
  }
  console.log("params", departament);
  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={() => navigate(-1)} // Regresa a la página anterior
        className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Volver
      </Button>

      <h1 className="text-4xl mb-4 font-bold">
        Detalles de la ruta: {departament}
      </h1>
      <p>Mostrando detalles para la ruta seleccionada: {departament}</p>

      {/* Aquí puedes agregar más detalles específicos de la ruta */}
      <pre>{JSON.stringify(routeData, null, 2)}</pre>
    </div>
  );
};

export default RutaDetail;
