import Rnd from './rnd'
import World from './world'

class Obstacle {
  static isOverlapping({ location: s }) {
    for (const { location: o, size } of World.obstacles) {
      if (s.x > o.x - size && s.x < o.x + size && (s.y > o.y - size && s.y < o.y + size)) return true
      else {
        return false
      }
    }
  }

  constructor({ id, fill = 'gray' } = {}) {
    this.id = id
    this.mass = Rnd.next(5, 1)
    this.charge = this.mass / 2
    this.size = this.mass * 25
    this.fill = fill
    this.location = Rnd.location({ max: { x: World.width - this.size * 2, y: World.height - this.size * 2 }, min: { x: this.size, y: this.size } })
  }

  setLocation() {
    this.fill = Obstacle.isOverlapping(this) == true ? 'red' : 'gray'
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
