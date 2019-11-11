import React, { useState } from "react";

import background from "./videos/background.mp4";
import mtn from "./images/free_image.jpeg";
import sea from "./images/sea.jpeg";
import trees from "./images/trees.jpeg";
import river from "./images/water.jpeg";
import ElevateAppBar from "./Appbar";
import "./Home.css";

import { useSpring, animated } from "react-spring";
import ReactPageScroller from "./scroller/index";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

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

const useStyles = makeStyles(theme => ({
  root: {
    height: 65,
    background: "transparent"
  },
  card: {
    width: 300,
    margin: theme.spacing(5)
  },
  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  }
}));

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

const options = ["Trees", "Beach", "River/Pond", "Mountain"];

export default function Home() {
  var _pageScroller = new ReactPageScroller();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const classes = useStyles();

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
      case 0:
        return trees;
      case 1:
        return sea;
      case 2:
        return river;
      case 3:
        return mtn;
      default:
        return null;
    }
  }

  function ContactCard(name) {
    let email = "";
    let phone = "";

    switch (name) {
      case "Victor La":
        email = "victor.la@dsds.sds";
        phone = "123-232-2312";
        break;
      case "Marissa Xiong":
        email = "marissa.xiong@dsds.sds";
        phone = "454-545-4234";
        break;
      case "Chenhui Ma":
        email = "chenhui.ma@dsds.sds";
        phone = "787-789-8786";
        break;
      default:
        return null;
    }

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={mtn}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Email Address: {email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone Number: {phone}
          </Typography>
        </CardContent>
      </Card>
    );
  }

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
              variant="contained"
              color="primary"
              size="large"
              ref={anchorRef}
              aria-label="split button large outlined secondary group"
              className="button"
            >
              <Button onClick={onClick}>{options[selectedIndex]}</Button>
              <Button
                color="primary"
                size="small"
                aria-owns={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              className="toFront"
              open={open}
              anchorEl={anchorRef.current}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
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
          </MuiThemeProvider>
        </div>

        <div className="secondBackground">
          <Grow
            in={currentPage === 3}
            style={{ transformOrigin: "0 0 0" }}
            {...(currentPage === 3 ? { timeout: 2000 } : {})}
          >
            {ContactCard("Victor La")}
          </Grow>
          <Grow
            in={currentPage === 3}
            style={{ transformOrigin: "0 0 0" }}
            {...(currentPage === 3 ? { timeout: 3000 } : {})}
          >
            {ContactCard("Marissa Xiong")}
          </Grow>
          <Grow
            in={currentPage === 3}
            style={{ transformOrigin: "0 0 0" }}
            {...(currentPage === 3 ? { timeout: 4000 } : {})}
          >
            {ContactCard("Chenhui Ma")}
          </Grow>
        </div>
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
