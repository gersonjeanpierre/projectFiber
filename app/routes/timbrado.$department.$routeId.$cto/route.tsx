import { useNavigate, useOutletContext } from "@remix-run/react";
import { Cto } from "~/components/interface/Route";
import Timbrado from "../timbrado/route";
import Timbrados from "./Timbrado";
import Monitoring from "./Monitoreo";

const renderRoute = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Timbrados /> */}
      <Monitoring />
    </div>
  );
};

export default renderRoute;
