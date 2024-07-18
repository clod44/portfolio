import SkillPoint from "./SkillPoint";
class SkillTree {
  skillpoints = [];
  currentPath = [];
  currentDistance = 999999;
  bestPath = [];
  bestDistance = 999999;
  safeZone = 0.1;
  step = 0;
  size = 0.1;
  p5;
  constructor(p5, skills) {
    this.p5 = p5;
    this.skillpoints = skills.map((skill, index) => {
      const x = p5.random(this.safeZone, 1.0 - this.safeZone);
      const y = p5.random(this.safeZone, 1.0 - this.safeZone);
      return new SkillPoint(p5, skill.title, x, y, 0.1);
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
    let thickness =
      this.p5.min(this.p5.width, this.p5.height) * this.size * 0.1;
    p5.strokeWeight(thickness);
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
    let thickness =
      this.p5.min(this.p5.width, this.p5.height) * this.size * 0.5;
    this.p5.strokeWeight(thickness);
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

  handleMousePressed() {
    this.skillpoints.forEach((sp) =>
      sp.handleMousePressed(this.p5.mouseX, this.p5.mouseY)
    );
  }

  handleMouseReleased() {
    this.skillpoints.forEach((sp) => sp.handleMouseReleased());
  }

  handleMouseDragged() {
    this.skillpoints.forEach((sp) =>
      sp.handleMouseDragged(this.p5.mouseX, this.p5.mouseY)
    );
  }
}

export default SkillTree;
