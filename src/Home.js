import React, { useState } from "react";
import background from "./videos/background.mp4";
import mtn from "./images/free_image.jpeg";
import sea from "./images/sea.jpeg";
import trees from "./images/trees.jpeg";
import river from "./images/water.jpeg";
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
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const options = ['Trees', 'Beach', 'River/Pond', 'Mountain'];

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

  // const handleClick = () => {
  //   alert(`You clicked ${options[selectedIndex]}`);
  // };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    reset();
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

  function getImage(i) {
    switch (i) {
      case 0: return trees;
      case 1: return sea;
      case 2: return river;
      case 3: return mtn;
      default: return null;
    }
  }
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
            <ButtonGroup
            variant="contained"
            color="secondary"
            ref={anchorRef}
            aria-label="split button large outlined secondary group"
            className="button"
            >
              <Button onClick={onClick}>{options[selectedIndex]}</Button>
              <Button
                color="secondary"
                size="small"
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper className="toFront" open={open} anchorEl={anchorRef.current} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper id="menu-list-grow">
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          <animated.div style={fade} className="image">
            {openImage ? <img src={getImage(selectedIndex)} alt="" /> : null}
          </animated.div>
        </div>

      </ReactPageScroller>
    </div>
  );
}
