const CONSTANTS = {
  GRAVITY: 0.8,
  FLAP_SPEED: -8,
  TERMINAL_VEL: 12,
  BIRD_WIDTH: 40,
  BIRD_HEIGHT: 30
};

export default class Bird {

  constructor(dimensions) {
    this.velocity = 0; 
    this.dimensions = dimensions;
    this.y = this.dimensions.height / 2;
    this.x = this.dimensions.width / 3;
  }

  drawBird (ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
  }

  animate(ctx) {
    this.move();
    this.drawBird(ctx);
  }

  move() {
    this.y += this.velocity;
    this.velocity += CONSTANTS.GRAVITY;
    
  }

  flap() {
    this.velocity = CONSTANTS.FLAP_SPEED;
  }

}