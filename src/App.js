import React, { PureComponent } from "react";
import Header from "./Header";
import Help from "./Help"
import Body from "./body"

import "./styles.scss";

const App = () => {
  return (
  <div className={"root"}>
      <Header />
      <Body />
  </div>
)};

export default App;
