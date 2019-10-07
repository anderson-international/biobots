import Rnd from './rnd'
import World from './world'

class Particle {
  constructor(id, mass, fill) {
    this.id = id
    this.mass = mass
    this.fill = fill
    this.location = Rnd.location({ max: { x: World.x2 + World.x4, y: World.y2 + World.y4 }, min: { x: World.x4, y: World.y4 } })
  }

  draw(shape) {
    World.p5.push()
    World.p5.translate(this.location.x, this.location.y)
    World.p5.rotate(this.velocity.heading())
    World.p5.scale(this.size)
    World.p5.fill(this.fill)
    World.p5.noStroke()
    shape()
    World.p5.pop()
  }
}

export default Particle
