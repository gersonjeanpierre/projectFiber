import { useState } from "react";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { getAfterUnderscoreText, normalizeRouteId } from "./util.deparment";
import { Button } from "~/components/ui/button";
import { Department } from "~/components/interface/Route";

type OutletContextType = {
  routes: Array<Department>;
};

export default function Departament() {
  const navigate = useNavigate();
  const { routes } = useOutletContext<OutletContextType>();
  const param = useParams().department;
  const department = getAfterUnderscoreText(useParams().department as string);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const handleRouteClick = (contenido: string) => {
    navigate(`/testing/${param}/${normalizeRouteId(contenido)}`);
    setSelectedContent(contenido);
  };

  const routesList = routes.find(
    (route) => route.departamento === department
  )?.rutas;

  // console.log(department);
  // console.log(routesList);
  // console.log("contenido", selectedContent);
  const selectRoute = routesList?.find(
    (route) => route.ruta === selectedContent
  );
  // console.log("selectRoute", selectRoute?.ctos);

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row gap-2 flex-wrap">
          {routesList?.map((route, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleRouteClick(route.ruta)}
            >
              {route.ruta}
            </Button>
          ))}
        </div>
      </div>
      <Outlet context={selectRoute} />
    </>
  );
}
