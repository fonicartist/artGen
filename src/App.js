import React, { PureComponent } from "react";
import Header from "./Header";
import Help from "./Help"
import Test from "./test"

export default class App extends PureComponent {

  render() {
    return (
        <div>
            <Header />
            <Help />
            <Test />
        </div>
    );
  }
}
