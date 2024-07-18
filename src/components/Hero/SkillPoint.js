export default class SkillPoint {
  constructor(_p5, _title, _x, _y, _size = 0.1) {
    this.p5 = _p5;
    this.x = _x;
    this.y = _y;
    this.velX = this.p5.random(-1.0, 1.0) * 0.001;
    this.velY = this.p5.random(-1.0, 1.0) * 0.001;
    this.title = _title;
    this.size = _size;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  update() {
    if (!this.dragging) {
      this.x += this.velX;
      this.y += this.velY;
      if (this.x < 0 || this.x > 1) {
        this.velX *= -1;
      }
      if (this.y < 0 || this.y > 1) {
        this.velY *= -1;
      }
    }
  }

  show() {
    this.p5.fill(255);
    this.p5.stroke(0);
    this.p5.strokeWeight(1);
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

  handleMousePressed(mx, my) {
    let x = this.x * this.p5.width;
    let y = this.y * this.p5.height;
    let r = this.p5.min(this.p5.width, this.p5.height) * this.size;
    if (this.p5.dist(mx, my, x, y) < r / 2) {
      this.dragging = true;
      this.offsetX = x - mx;
      this.offsetY = y - my;
    }
  }

  handleMouseReleased() {
    this.dragging = false;
  }

  handleMouseDragged(mx, my) {
    if (this.dragging) {
      this.x = (mx + this.offsetX) / this.p5.width;
      this.y = (my + this.offsetY) / this.p5.height;
    }
  }
}
