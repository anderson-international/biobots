import Rnd from "./rnd"
import Vector from "./vector"

class Bot {
  constructor({ mass = 2, maxVelocity = 5 } = {}) {
    this.mass = mass
    this.maxVelocity = maxVelocity
    this.acceleration = new Vector()
    this.velocity = Rnd.velocity()
    this.location = Rnd.location()
  }

  draw(p5) {
    p5.push()
    p5.translate(this.location.x, this.location.y)
    p5.rotate(this.velocity.heading())
    p5.scale(0.5 + this.mass / 8)
    p5.fill(128, 255, 128)
    p5.stroke(0, 255, 0)
    p5.triangle(-4, 4, 8, 0, -4, -4)
    p5.pop()
  }

  move() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxVelocity)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  accelerate(force) {
    this.acceleration.add(Vector.div(force, this.mass))
  }
}

export default Bot
