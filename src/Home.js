import React, { useState } from "react";
import background from "./videos/background.mp4";
import { useSpring, animated } from "react-spring";

import Button from "@material-ui/core/Button";

import image from "./images/free_image.jpeg";
// import whiteImage from "./images/whiteBackground.jpg";
import "./styles.scss";

import ElevateAppBar from "./Appbar";

export default function Home() {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 }
  });

  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };
  const reset = () => {
    setOpen(false);
  };

  return (
    <div>
      <animated.div style={fadeIn}>
        <ElevateAppBar />
        <video autoPlay loop muted className="video">
          <source src={background} type="video/mp4" />
        </video>
      </animated.div>
      <div className="whiteBackground">
        <div className="padding-center">
          <Button onClick={onClick}>Get image</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
        <div className="padding-center">
          {open ? <img src={image} alt="image" /> : null}
        </div>
      </div>
    </div>
  );
}
