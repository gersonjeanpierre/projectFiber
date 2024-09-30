import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "FiberTracker" },
    { name: "description", content: "Timbrados de CTOs" },
  ];
};

export default function Work() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        FiberTracker
      </h1>
      <div className="flex gap-4 mt-5">
        <Button>
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
          HGU
        </Button>
        <Link to="/timbrado">
          <Button>
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
            Timbrado
          </Button>
        </Link>
      </div>
    </div>
  );
}
