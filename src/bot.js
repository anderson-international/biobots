import Rnd from './rnd'
import Vector from './vector'

class Bot {
  constructor({ charge = 1, mass = 4, maxVelocity = 1, fill = 'lime' } = {}) {
    this.charge = charge
    this.mass = mass
    this.maxVelocity = maxVelocity
    this.fill = fill
    this.acceleration = new Vector()
    this.velocity = Rnd.velocity()
    this.location = Rnd.location()
  }

  draw(p5) {
    p5.push()
    p5.translate(this.location.x, this.location.y)
    p5.rotate(this.velocity.heading())
    p5.scale(0.5 + this.mass / 8)
    p5.fill(this.fill)
    p5.noStroke()
    p5.triangle(-4, 4, 8, 0, -4, -4)
    p5.pop()
  }

  move() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxVelocity)
    this.location.add(this.velocity)
    this.acceleration.setZero()
  }

  accelerate(force) {
    this.acceleration.add(force.dividePure(this.mass))
  }
}

export default Bot
