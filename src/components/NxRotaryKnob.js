/**
 * NxRotaryKnob - Tweak it
 * A graphical rotary knob that a user can click and spin
 * More: https://github.com/matterofabstract/nvAux/wiki/NxRotaryKnob
 *
 */

import React, { useRef, useState } from 'react';

import { useEventListener } from '../hooks';

import imgKnob from '../media/images/knob.png';

export const NxRotaryKnob = () => {
  const inputEl = useRef(null);
  // const store = React.useContext(StoreContext);

  let [active, setActive]  = useState(false);
  let [angle, setAngle]  = useState(0);
  let [rotation, setRotation] = useState(0);
  let [startAngle, setStartAngle] = useState(0);
  let [center, setCenter] = useState({ x: 0, y: 0});

  const R2D = 180 / Math.PI;

  const start = (e) => {
    // e.preventDefault();
    var bb = inputEl.current.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    setCenter({
      x: l + (w / 2),
      y: t + (h / 2)
    })
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    setStartAngle(R2D * Math.atan2(y, x));
    setActive(true);
  };

  const handleMousemove = (e) => {
    if (active === true) {
      // e.preventDefault();
      rotate(e);
    }
  }

  const handleMouseup = (e) => {
    // e.preventDefault();
    stop(e);
  }

  const rotate = (e) => {
    e.preventDefault();
    var x = e.clientX - center.x,
      y = e.clientY - center.y,
      d = R2D * Math.atan2(y, x);
    setRotation(d - startAngle);
    return inputEl.current.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
  };

  const stop = () => {
    setAngle(angle += rotation);
    setActive(false);
  };

  useEventListener('mousedown', start, inputEl.current);
  useEventListener('mousemove', handleMousemove);
  useEventListener('mouseup', handleMouseup);

  return (
    <div
      ref={inputEl}
      style={{
        position: 'relative',
        top: -3,
        backgroundImage: `url(${imgKnob})`,
        backgroundSize: 'contain',
        width: 33,
        height: 28
      }}
    />
  );
};
