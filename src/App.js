import React from "react";
import { useRoutes } from "hookrouter";
import Routes from "./Routes";

export default function App() {
  const routeResult = useRoutes(Routes);

  return <div>{routeResult}</div>;
}
