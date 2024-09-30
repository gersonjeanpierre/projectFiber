import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "FiberTracker" },
    { name: "description", content: "Timbrados de CTOs" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        FiberTracker
      </h1>
      <Link to="work">
        <Button>Ingresar</Button>
      </Link>
    </div>
  );
}

