import React, {useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useSpring, animated } from "react-spring";
import image from "./images/free_image.jpeg";

const options = ['Spring', 'Summer', 'Autumn', 'Winter'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
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
    //alert(`You clicked ${options[selectedIndex]}`);
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
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorRef}
        aria-label="split button large outlined secondary group"
        //className="button"
        >
          <Button onClick={onClick}>{options[selectedIndex]}</Button>
          <Button
            color="primary"
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
      </Grid>
      <ButtonGroup
        color="secondary"
        size="large"
        aria-label="large outlined secondary button group"
        className="button"
      >
        <Button onClick={onClick}>Get image</Button>
        <Button onClick={reset}> Reset </Button>
      </ButtonGroup>
      <animated.div style={fade} className="image">
        {openImage ? <img src={image} alt="image" /> : null}
      </animated.div>
    </Grid>
    </div>
  );
}
