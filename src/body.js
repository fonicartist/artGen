import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SimpleModal from './SimpleModal.js'

import image from './images/free_image.jpeg'
export default function Body({
}){
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(true)
  };
  const reset = () => {
    setOpen(false)
  }
    return (
      <div>
        <div className="padding-center">
        <SimpleModal />
        </div>
        <div className={"padding-center"}>
          <Button onClick={onClick}>
            Get image
          </Button>
          <Button onClick={reset}>
            Reset
          </Button>
      </div>
      <div className="padding-center">
        {open ? (
          <img src={image} alt="image" />
        ) : null
        }
      </div>
    </div>
    );
  }
