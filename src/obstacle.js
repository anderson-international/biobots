import Rnd from './rnd'
import World from './world'

class Obstacle {
  constructor({ id, fill = 'gray' } = {}) {
    this.id = id
    this.mass = Rnd.next(5, 1)
    this.charge = this.mass / 2
    this.size = this.mass * 25
    this.fill = fill
    this.location = Rnd.location({ max: { x: World.width - this.size * 2, y: World.height - this.size * 2 }, min: { x: this.size, y: this.size } })
  }

  draw() {
    World.p5.push()
    World.p5.fill(this.fill)
    World.p5.rectMode('center')
    World.p5.square(this.location.x, this.location.y, this.size)
    World.p5.pop()
  }

  is(obstacle) {
    return this.id == obstacle.id
  }
}

export default Obstacle
