import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import SkillTree from "./SkillTree.js"; // Import SkillTree

function sketch(p5) {
  const getCanvasSize = () => {
    const canvasContainer = document.getElementById("canvas-container-hero");
    return {
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight,
    };
  };

  let st;
  const skills = [
    { title: "javascript", something: 1 },
    { title: "nodejs", something: 1 },
    { title: "C#", something: 1 },
    { title: "bootstrap", something: 1 },
    { title: "tailwindcss", something: 1 },
    { title: "react", something: 1 },
    { title: "segs", something: 1 },
  ];

  p5.setup = () => {
    const { width, height } = getCanvasSize();
    p5.createCanvas(width, height);
    st = new SkillTree(p5, skills);
  };

  p5.draw = () => {
    p5.clear();
    st.process();
    st.show();
    p5.ellipse(p5.mouseX, p5.mouseY, 100);
  };

  p5.mousePressed = () => {
    if (st) st.handleMousePressed();
  };

  p5.mouseReleased = () => {
    if (st) st.handleMouseReleased();
  };

  p5.mouseDragged = () => {
    if (st) st.handleMouseDragged();
  };
  p5.windowResized = () => {
    const { width, height } = getCanvasSize();
    p5.resizeCanvas(width, height);
  };
}

function P5Canvas() {
  return <ReactP5Wrapper sketch={sketch} />;
}

export default P5Canvas;
