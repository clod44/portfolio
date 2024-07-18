import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import GOL from "./GOL.js";

function sketch(p5) {
  const getCanvasSize = () => {
    const canvasContainer = document.getElementById("canvas-container-hero");
    return {
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight,
    };
  };

  let gol;
  p5.setup = () => {
    const { width, height } = getCanvasSize();
    p5.createCanvas(width, height);
    gol = new GOL(p5, 0.05);
    p5.smooth();
    p5.frameRate(30);
  };

  p5.draw = () => {
    //p5.clear();
    p5.background(0, 30);
    gol.update();
    if (
      gol &&
      p5.mouseX > 0 &&
      p5.mouseY > 0 &&
      p5.mouseX < p5.width &&
      p5.mouseY < p5.height
    ) {
      gol.drawMouse(p5.mouseX, p5.mouseY);
    }
    p5.image(gol.pg, 0, 0, p5.width, p5.height);
  };

  p5.mousePressed = () => {};

  p5.mouseReleased = () => {};

  p5.mouseDragged = () => {};
  p5.windowResized = () => {
    const { width, height } = getCanvasSize();
    p5.resizeCanvas(width, height);
    gol = new GOL(p5, 0.1);
  };
}

function P5Canvas() {
  return <ReactP5Wrapper sketch={sketch} />;
}

export default P5Canvas;
