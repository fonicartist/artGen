import React from "react";
import Main from "./Main";
import Home from "./Home";

const Routes = {
  "/": () => <Main />,
  "/Home": () => <Home />
};
export default Routes;
