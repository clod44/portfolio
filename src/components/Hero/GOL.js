class GOL {
  p5;
  pg;
  res;
  col;
  r;
  g;
  b;
  constructor(_p5, _res = 0.1) {
    this.p5 = _p5;
    this.res = _res;
    let w = this.p5.floor(this.p5.width * this.res);
    let h = this.p5.floor(this.p5.height * this.res);
    this.pg = this.p5.createGraphics(w, h);
    this.pg.noSmooth();
    this.col = this.p5.color(255, 0, 0);
    this.randomizePG();
  }
  update() {
    this.applyRules();

    this.p5.colorMode(this.p5.HSB, 255, 255, 255);
    this.col = this.p5.color(this.p5.frameCount % 255, 150, 255);
    this.r = this.p5.red(this.col);
    this.g = this.p5.green(this.col);
    this.b = this.p5.blue(this.col);
    this.p5.colorMode(this.p5.RGB, 255, 255, 255);
  }

  applyRules() {
    this.pg.loadPixels();
    const nextPixels = new Uint8Array(this.pg.width * this.pg.height);

    for (let y = 0; y < this.pg.height; y++) {
      for (let x = 0; x < this.pg.width; x++) {
        let nCount = 0;
        const index = (x + y * this.pg.width) * 4;
        const alive = this.pg.pixels[index + 3] > 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) {
              const ni = (x + i + this.pg.width) % this.pg.width;
              const nj = (y + j + this.pg.height) % this.pg.height;
              const nIndex = (ni + nj * this.pg.width) * 4;
              nCount += this.pg.pixels[nIndex + 3] > 0 ? 1 : 0;
            }
          }
        }

        let newState = alive;
        if (alive) {
          if (nCount < 2 || nCount > 3) {
            newState = 0;
          }
        } else {
          if (nCount === 3) {
            newState = 1;
          }
        }
        nextPixels[x + y * this.pg.width] = newState;
      }
    }

    for (let y = 0; y < this.pg.height; y++) {
      for (let x = 0; x < this.pg.width; x++) {
        const index = (x + y * this.pg.width) * 4;
        const alpha = nextPixels[x + y * this.pg.width] * 255;
        this.pg.pixels[index] = this.r;
        this.pg.pixels[index + 1] = this.g;
        this.pg.pixels[index + 2] = this.b;
        this.pg.pixels[index + 3] = alpha;
      }
    }

    this.pg.updatePixels();
  }
  drawMouse(x, y) {
    this.pg.fill(255);
    this.pg.noStroke();
    const normalizedX = this.p5.floor(x * this.res);
    const normalizedY = this.p5.floor(y * this.res);
    const constrainedX = this.p5.constrain(normalizedX, 0, this.pg.width);
    const constrainedY = this.p5.constrain(normalizedY, 0, this.pg.height);
    this.pg.ellipseMode(this.p5.CENTER);
    const r = this.pg.width * 0.1;
    this.pg.ellipse(constrainedX, constrainedY, r, r);
  }

  randomizePG() {
    this.pg.background(255);
    this.pg.loadPixels();
    for (let i = 0; i < this.pg.pixels.length; i += 4) {
      const a = this.p5.random() < 0.1 ? 255 : 0;
      this.pg.pixels[i + 3] = a; // Set the alpha channel
    }
    this.pg.updatePixels();
  }
}

export default GOL;
