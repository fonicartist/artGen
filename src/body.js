import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import image from './images/free_image.jpeg'
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});


export default function Body({
}){
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(true)
  };
  const reset = () => {
    setOpen(false)
  }
    return (
      <div>
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
