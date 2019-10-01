import Rnd from './rnd'
import World from './world'
import Vector from './vector'

class Bot {
  static intersects(a) {
    for (const b of World.bots) {
      if (a.is(b)) continue
      if (a.location.distanceTo(b.location) < 2) return true
    }
  }

  constructor({ id, mass = 1, maxVelocity = 3, minVelocity = 1, fill = 'lime' } = {}) {
    this.id = id
    this.mass = mass
    this.charge = this.mass / 5
    this.maxVelocity = maxVelocity
    this.minVelocity = minVelocity
    this.fill = fill
    this.acceleration = new Vector()
    this.velocity = Rnd.velocity(this.maxVelocity)
    this.location = Rnd.location({ max: { x: World.x2 + World.x4, y: World.y2 + World.y4 }, min: { x: World.x4, y: World.y4 } })
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
    this.velocity.limit(this.maxVelocity, this.minVelocity)
    this.location.add(this.velocity)
    this.acceleration.setZero()
  }

  accelerate(force) {
    this.acceleration.add(force.dividePure(this.mass))
  }
}

export default Bot
