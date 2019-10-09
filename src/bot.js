import Rnd from './rnd'
import World from './world'
import Vector from './vector'
import Particle from './particle'

class Bot extends Particle {
  constructor(args) {
    super(args)
    this.size = this.mass / 10
    this.rangeVelocity = args.rangeVelocity
    this.acceleration = new Vector()
    this.velocity = Rnd.velocity(this.maxVelocity)
    this.location = Rnd.location({
      max: { x: World.p5.windowWidth * 0.75, y: World.p5.windowHeight * 0.75 },
      min: { x: World.p5.windowWidth * 0.25, y: World.p5.windowHeight * 0.25 },
    })
  }

  draw() {
    World.p5.push()
    World.p5.translate(this.location.x, this.location.y)
    World.p5.rotate(this.velocity.heading())
    World.p5.scale(this.size)
    World.p5.fill(this.fill)
    World.p5.triangle(-4, 4, 8, 0, -4, -4)
    World.p5.pop()
  }

  move() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.rangeVelocity)
    this.location.add(this.velocity)
    this.acceleration.multiply(0)
  }

  accelerate(force) {
    this.acceleration.add({ x: force.x / this.mass, y: force.y / this.mass })
  }
}

export default Bot
