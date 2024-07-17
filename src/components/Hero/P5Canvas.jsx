import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

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
    {
      title: "javascript",
      something: 1,
    },
    {
      title: "nodejs",
      something: 1,
    },
    {
      title: "C#",
      something: 1,
    },
    {
      title: "bootstrap",
      something: 1,
    },
    {
      title: "tailwindcss",
      something: 1,
    },
    {
      title: "react",
      something: 1,
    },
    {
      title: "segs",
      something: 1,
    },
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

  p5.windowResized = () => {
    const { width, height } = getCanvasSize();
    p5.resizeCanvas(width, height);
  };
}

class SkillPoint {
  x = 0;
  y = 0;
  velX = 0;
  velY = 0;
  title = "???";
  size = 0.1;
  p5;
  constructor(_p5, _title, _x, _y, _size = 0.1) {
    this.p5 = _p5;
    this.x = _x;
    this.y = _y;
    this.velX = this.p5.random(-1.0, 1.0) * 0.001;
    this.velY = this.p5.random(-1.0, 1.0) * 0.001;
    this.title = _title;
    this.size = _size;
  }
  update() {
    this.x += this.velX;
    this.y += this.velY;
    if (this.x < 0 || this.x > 1) {
      this.velX *= -1;
    }
    if (this.y < 0 || this.y > 1) {
      this.velY *= -1;
    }
  }
  show() {
    this.p5.fill(255);
    this.p5.stroke(0);
    let x = this.x * this.p5.width;
    let y = this.y * this.p5.height;
    let r = this.p5.min(this.p5.width, this.p5.height) * this.size;
    this.p5.ellipse(x, y, r);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.fill(0);
    this.p5.stroke(255);
    this.p5.textSize(r * 0.25);
    this.p5.text(this.title, x, y);
  }
}

class SkillTree {
  skillpoints = [];
  currentPath = [];
  currentDistance = 999999;
  bestPath = [];
  bestDistance = 999999;
  safeZone = 0.1;
  step = 0;
  p5;
  constructor(p5, skills) {
    this.p5 = p5;
    this.skillpoints = skills.map((skill, index) => {
      const x = p5.random(this.safeZone, 1.0 - this.safeZone);
      const y = p5.random(this.safeZone, 1.0 - this.safeZone);
      return new SkillPoint(p5, skill.title, x, y);
    });

    this.currentPath = Array.from(Array(skills.length).keys());
    this.bestPath = [...this.currentPath];
  }

  show() {
    this.showCurrentPath(this.p5);
    this.showBestPath(this.p5);
    this.showSkills(this.p5);
  }
  process() {
    this.step++;
    this.updateSkills();

    let availableSpIndexes = [...Array(this.skillpoints.length).keys()];

    let currentSp = this.skillpoints[0];
    for (let i = 1; i < this.skillpoints.length; i++) {
      let nextSpIndex;

      if (this.p5.random(1) < 0.5 && availableSpIndexes.length > 0) {
        const randomIndex = Math.floor(
          this.p5.random(availableSpIndexes.length)
        );
        nextSpIndex = availableSpIndexes[randomIndex];
      } else {
        nextSpIndex = this.getClosestPathIndex(currentSp, availableSpIndexes);
      }

      this.currentPath[i] = nextSpIndex;
      availableSpIndexes = availableSpIndexes.filter(
        (index) => index !== nextSpIndex
      );
      currentSp = this.skillpoints[nextSpIndex];
    }

    this.currentDistance = this.calculatePathDistance(this.currentPath);

    if (this.currentDistance < this.bestDistance) {
      this.bestDistance = this.currentDistance;
      this.bestPath = [...this.currentPath]; // Update bestPath if current path is better
    }
  }

  calculatePathDistance(path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const sp1 = this.skillpoints[path[i]];
      const sp2 = this.skillpoints[path[i + 1]];
      const d = this.p5.dist(sp1.x, sp1.y, sp2.x, sp2.y);
      totalDistance += d;
    }
    return totalDistance;
  }

  getClosestPathIndex(sp, availableSpIndexes) {
    if (!sp) {
      console.error("undefined sp in getClosestPathIndex", availableSpIndexes);
      return;
    }
    const spPos = this.p5.createVector(sp.x, sp.y);
    let closestD = Infinity;
    let closestIndex = -1;
    for (let i = 0; i < availableSpIndexes.length; i++) {
      const checkSpIndex = availableSpIndexes[i];
      const checkSp = this.skillpoints[checkSpIndex];
      const checkSpPos = this.p5.createVector(checkSp.x, checkSp.y);
      const d = this.p5.dist(spPos.x, sp.y, checkSpPos.x, checkSpPos.y);
      if (d < closestD) {
        closestD = d;
        closestIndex = checkSpIndex;
      }
    }
    return closestIndex;
  }

  showCurrentPath(p5) {
    p5.stroke(255, 0, 0);
    for (let i = 0; i < this.currentPath.length - 1; i++) {
      const spIndex1 = this.currentPath[i];
      const spIndex2 = this.currentPath[i + 1];

      //i have no idea why is it jumping out of the window
      if (
        spIndex1 >= this.skillpoints.length ||
        spIndex2 >= this.skillpoints.length
      ) {
        console.error("index out of bounds", spIndex1, spIndex2);
        continue;
      }

      const sp1 = this.skillpoints[spIndex1];
      const sp2 = this.skillpoints[spIndex2];
      if (!sp1 || !sp2) {
        console.error("Undefined skillpoint", sp1, sp2);
        continue;
      }

      let x1 = sp1.x * p5.width;
      let y1 = sp1.y * p5.height;
      let x2 = sp2.x * p5.width;
      let y2 = sp2.y * p5.height;
      p5.line(x1, y1, x2, y2);
    }
  }
  showBestPath() {
    this.p5.stroke(0, 255, 0);
    this.p5.strokeWeight(5);
    for (let i = 0; i < this.bestPath.length - 1; i++) {
      const spIndex1 = this.bestPath[i];
      const spIndex2 = this.bestPath[i + 1];

      if (
        spIndex1 >= this.skillpoints.length ||
        spIndex2 >= this.skillpoints.length
      ) {
        console.error("Index out of bounds", spIndex1, spIndex2);
        continue;
      }

      const sp1 = this.skillpoints[spIndex1];
      const sp2 = this.skillpoints[spIndex2];

      if (!sp1 || !sp2) {
        console.error("Undefined skillpoint", sp1, sp2);
        continue;
      }

      let x1 = sp1.x * this.p5.width;
      let y1 = sp1.y * this.p5.height;
      let x2 = sp2.x * this.p5.width;
      let y2 = sp2.y * this.p5.height;
      this.p5.line(x1, y1, x2, y2);
    }
  }

  showSkills() {
    this.skillpoints.forEach((sp) => {
      sp.show();
    });
  }
  updateSkills() {
    this.skillpoints.forEach((sp) => {
      sp.update();
    });
  }
}

function P5Canvas() {
  return <ReactP5Wrapper sketch={sketch} />;
}

export default P5Canvas;
