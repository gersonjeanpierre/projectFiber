import type { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Hello to a particular person" },
    { name: "description", content: "Hi!" },
  ];
};

export default function HomePageNested() {
  //the useParams Hook gets the URL parameters.
  const { routeName } = useParams();
  return (
    <div>
      {/*Gets the 'name' field from the parameter and output to the DOM:*/}
      <h1>Hi, {routeName}</h1>
    </div>
  );
}
