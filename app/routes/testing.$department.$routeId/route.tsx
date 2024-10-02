import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { Route } from "~/components/interface/Route";
import { initRouteId } from "./util.routeId";
import { Button } from "~/components/ui/button";
import { useState } from "react";

const DisplayRoute = () => {
  const navigate = useNavigate();
  const { department, routeId } = useParams();
  const data = useOutletContext<Route>() || {};
  const ctos = data.ctos || [];
  const [selectedCto, setSelectedCto] = useState<string | null>(null);

  const selectCto = ctos.find(
    (cto) => data.ruta === initRouteId(routeId ?? "")
  );
  const handleCto = (cto: string) => {
    navigate(`/testing/${department}/${routeId}/${cto}`);
    setSelectedCto(cto);
  };
  console.log("data", data);
  console.log("selectCto", selectCto);
  console.log(useParams());
  console.log(ctos);
  console.log(initRouteId(routeId ?? ""));
  return (
    <>
      <div className="flex gap-2 flex-wrap mt-3">
        {ctos.map((cto, index) => (
          <Button key={index} onClick={() => handleCto(cto.cto)}>
            <div>
              <div>{cto.cto}</div>
              <div>{cto.state}</div>
              <div>{cto.observation}</div>
            </div>
          </Button>
        ))}
      </div>
      <Outlet context={selectCto} />
    </>
  );
};

export default DisplayRoute;
