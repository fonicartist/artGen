import React, { useState } from "react";
import "./Main.css";
import { useSpring, animated } from "react-spring";
import { useRedirect } from "hookrouter";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Main() {
  const [destination, setDestination] = useState("/");
  useRedirect("/", destination);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 450, friction: 40 }
  }));

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 3000 }
  });

  return (
    <>
      <div>
        <style>
          {
            "html { \
              background-color: rgb(5, 7, 6); \
              width: 100%; \
              height: 100%; \
              display: flex; \
              align-items: center; \
              justify-content: center; \
              overflow: hidden; \
            }"
          }
        </style>
        <animated.div style={fadeIn}>
          <animated.div
            className="logo"
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            onClick={async () => {
              setTimeout(() => setDestination("/Home"), 800);
            }}
            style={{ transform: props.xys.interpolate(trans) }}
          />
        </animated.div>
      </div>
    </>
  );
}
