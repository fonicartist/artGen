import React from "react";
import Popup from "reactjs-popup";
import "./Help.css"

export default () => (
  <div className="padding">
    <Popup trigger={<button className="button"> Help</button>} position="bottom">
        <div className="popup">Welcome!</div>
        <div className="popup">To get started:</div>
        <div className="popup_small">
            1. Choose what style of background image you would like to create
        </div>
        <div className="popup_small">
            2. Click "Generate"
        </div>
        <div className="popup">Download:</div>
    </Popup>
  </div>
);
