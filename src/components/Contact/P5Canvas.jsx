import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  const getCanvasSize = () => {
    const canvasContainer = document.getElementById("canvas-container");
    return {
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight,
    };
  };

  let spaceTexture;
  let font;
  p5.preload = () => {
    spaceTexture = p5.loadImage("/space.jpg");
    font = p5.loadFont("/font.ttf"); // custom font required for 3d text
  };
  p5.setup = () => {
    const { width, height } = getCanvasSize();
    p5.createCanvas(width, height, p5.WEBGL);
  };

  p5.draw = () => {
    p5.background(250);

    p5.push();
    p5.noFill();
    p5.stroke(255);

    //p5.rotateX(p5.PI * 0.5); // initial angle
    const timeOffsetFactor = p5.sin(p5.frameCount * 0.001);
    const timeOffset = p5.PI * 0.1 * timeOffsetFactor;
    const mouseOffsetFactor = 0.1;
    const rotX = (p5.mouseY / (p5.height * 1.0)) * p5.PI * mouseOffsetFactor;
    p5.rotateX(rotX + timeOffset);
    const rotY = (p5.mouseX / (p5.width * -1.0)) * p5.PI * mouseOffsetFactor;
    p5.rotateY(rotY + timeOffset);

    p5.texture(spaceTexture);
    p5.panorama(spaceTexture);

    p5.noFill();
    p5.strokeWeight(1);
    p5.sphere(p5.width, 10, 10);

    //p5.normalMaterial();

    p5.textFont(font);
    p5.fill(255);
    p5.stroke(255);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(50);
    for (let i = 0; i < 3; i++) {
      const textSizeOffset = p5.sin((p5.frameCount + i * 10) * 0.01);
      p5.fill(255, p5.map(i, 0, 3, 0, 255), 0);
      p5.textSize(40 + 5 * textSizeOffset);
      p5.text("Contact Me", 0, 0);
      p5.translate(0, 0, 3);
    }
    //p5.plane(100);
    //p5.rotateX(p5.PI * 0.5);
    //p5.plane(100);
    //p5.rotateY(p5.PI * 0.5);
    //p5.plane(100);

    p5.pop();
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
