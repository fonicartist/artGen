import React, { useState } from "react";

import background from "./videos/background.mp4";
import image from "./images/free_image.jpeg";
import ElevateAppBar from "./Appbar";
import "./Home.css";

import { useSpring, animated } from "react-spring";
import ReactPageScroller from "./scroller/index";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import VideoIcon from "@material-ui/icons/SlowMotionVideo";
import AppIcon from "@material-ui/icons/AppsRounded";
import ContactIcon from "@material-ui/icons/Face";

const useStyles = makeStyles({
  root: {
    height: 65,
    background: "transparent"
  }
});

const buttonTheme = createMuiTheme({
  palette: {
    primary: { 500: "#f06856" }
  }
});

const navigationTheme = createMuiTheme({
  palette: {
    primary: { 500: "#f06856" }
  },
  typography: {
    fontSize: 12
  }
});

export default function Home() {
  var _pageScroller = new ReactPageScroller();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const classes = useStyles();

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 }
  });

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    config: { duration: 400 }
  });

  const onClick = () => {
    setOpen(true);
  };
  const reset = () => {
    setOpen(false);
  };

  const pageOnChange = number => {
    setCurrentPage(number);
    setValue(number - 1);
  };

  const goToPage = pageNum => {
    _pageScroller.goToPage(pageNum);
  };

  const handleChange = (event, newValue) => {
    goToPage(newValue);
  };

  return (
    <div>
      <ElevateAppBar />

      <ReactPageScroller
        ref={c => (_pageScroller = c)}
        pageOnChange={pageOnChange}
        goToPage
      >
        <animated.div style={fadeIn}>
          <video autoPlay loop muted className="video">
            <source src={background} type="video/mp4" />
          </video>
        </animated.div>

        <div className="firstBackground">
          <MuiThemeProvider theme={buttonTheme}>
            <ButtonGroup
              color="primary"
              size="large"
              aria-label="large outlined secondary button group"
              className="button"
            >
              <Button onClick={onClick}>Get image</Button>
              <Button onClick={reset}> Reset </Button>
            </ButtonGroup>
            <animated.div style={fade} className="image">
              <img src={image} alt="image" />
            </animated.div>
          </MuiThemeProvider>
        </div>

        <div className="secondBackground"></div>
      </ReactPageScroller>

      <MuiThemeProvider theme={navigationTheme}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.root}
          id="navigation"
          color="primary"
        >
          <BottomNavigationAction
            label="Video"
            value={0}
            icon={<VideoIcon fontSize="large" />}
          />
          <BottomNavigationAction
            label="App"
            value={1}
            icon={<AppIcon fontSize="large" />}
          />
          <BottomNavigationAction
            label="About"
            value={2}
            icon={<ContactIcon fontSize="large" />}
          />
        </BottomNavigation>
      </MuiThemeProvider>
    </div>
  );
}
