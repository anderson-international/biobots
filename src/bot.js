import Rnd from './rnd'
import World from './world'
import Vector from './vector'
import Particle from './particle'

class Bot extends Particle {
  constructor({ id, mass, maxVelocity, minVelocity, fill }) {
    super(id, mass, fill)
    this.size = mass / 10
    this.maxVelocity = maxVelocity
    this.minVelocity = minVelocity
    this.acceleration = new Vector()
    this.velocity = Rnd.velocity(this.maxVelocity)
  }

  draw() {
    super.draw(() => World.p5.triangle(-4, 4, 8, 0, -4, -4))
  }

  move() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxVelocity, this.minVelocity)
    this.location.add(this.velocity)
    this.acceleration.multiply(0)
  }

  accelerate(force) {
    this.acceleration.add({ x: force.x / this.mass, y: force.y / this.mass })
  }
}

export default Bot
