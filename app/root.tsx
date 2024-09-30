import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Meta />
      <Links />
      {children}
      <ScrollRestoration />
      <Scripts />
    </>
  );
}

// export function HydrateFallback() {
//   return (
//     <>
//       <p>Loading...</p>
//       <Scripts />
//     </>
//   );
// }

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

