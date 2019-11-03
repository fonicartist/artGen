import React, { useState } from "react";
import background from "./videos/background.mp4";
import image from "./images/free_image.jpeg";
import ElevateAppBar from "./Appbar";
import "./styles.scss";

import { useSpring, animated } from "react-spring";
import ReactPageScroller from "react-page-scroller";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import SplitButton from "./testcategories";
const options = ['Spring', 'Summer', 'Autumn', 'Winter'];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [reactPageScroller, setRPS] = useState(null);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 }
  });

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: openImage ? 1 : 0 },
    config: { duration: 400 }
  });

  const onClick = () => {
    setOpenImage(true);
  };
  const reset = () => {
    setOpenImage(false);
  };

  const handleClick = () => {
    alert(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <ElevateAppBar />
      <ReactPageScroller ref={c => setRPS(c)}>
        <animated.div style={fadeIn}>
          <video autoPlay loop muted className="video">
            <source src={background} type="video/mp4" />
          </video>
        </animated.div>
        <div className="imageBackground">
          {/* <div className="padding-center">
            <Button onClick={onClick}>Get image</Button>
            <Button onClick={reset}>Reset</Button>
          </div> */}
          <SplitButton />
          
        </div>
      </ReactPageScroller>
    </div>
  );
}
