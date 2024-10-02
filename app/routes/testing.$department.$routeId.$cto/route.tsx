import { useNavigate, useOutletContext } from "@remix-run/react";
import { Cto } from "~/components/interface/Route";
import Timbrado from "../testing/route";
import Timbrados from "./Timbrado";
import Monitoring from "./Monitoreo";

const renderRoute = () => {
  const navigate = useNavigate();
  const aa = useOutletContext<Cto>();
  console.log("aa", aa);
  return (
    <div>
      {/* <Timbrados /> */}
      <Monitoring />
    </div>
  );
};

export default renderRoute;
