import Rnd from './rnd'
import World from './world'
import Vector from './vector'

class Bot {
  startBox = { max: { x: World.x2 + World.x4, y: World.y2 + World.y4 }, min: { x: World.x4, y: World.y4 } }
  constructor({ id, mass = 1, maxVelocity = 3, fill = 'lime' } = {}) {
    this.id = id
    this.mass = mass
    this.charge = this.mass / 5
    this.maxVelocity = maxVelocity
    this.fill = fill
    this.acceleration = new Vector()
    this.velocity = Rnd.velocity(this.maxVelocity)
    this.location = Rnd.location(this.startBox)
  }

  draw() {
    World.p5.push()
    World.p5.translate(this.location.x, this.location.y)
    World.p5.rotate(this.velocity.heading())
    World.p5.scale(this.mass)
    World.p5.fill(this.fill)
    World.p5.noStroke()
    World.p5.triangle(-4, 4, 8, 0, -4, -4)
    World.p5.pop()
  }

  is(bot) {
    return this.id == bot.id
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
