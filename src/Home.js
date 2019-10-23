import React, { useState } from "react";
import background from "./videos/background.mp4";
import image from "./images/free_image.jpeg";
import ElevateAppBar from "./Appbar";
import "./styles.scss";

import { useSpring, animated } from "react-spring";
import ReactPageScroller from "react-page-scroller";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function Home() {
  const [open, setOpen] = useState(false);

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

  const [reactPageScroller, setRPS] = useState(null);

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
            {open ? <img src={image} alt="image" /> : null}
          </animated.div>
        </div>
      </ReactPageScroller>
    </div>
  );
}
