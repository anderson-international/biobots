import Rnd from './rnd'
import World from './world'

class Obstacle {
  static isIntersect(a) {
    const ax1 = a.location.x - a.size / 2
    const ay1 = a.location.y - a.size / 2
    const ax2 = ax1 + a.size
    const ay2 = ay1 + a.size
    for (const b of World.obstacles) {
      if (a.is(b)) continue
      const bx1 = b.location.x - b.size / 2
      const by1 = b.location.y - b.size / 2
      const bx2 = bx1 + b.size
      const by2 = by1 + b.size
      if (ax1 <= bx2 && ax2 >= bx1 && ay1 <= by2 && ay2 >= by1) return true
    }
  }

  constructor({ id, fill = 'gray' } = {}) {
    this.id = id
    this.mass = Rnd.next(5, 1)
    this.charge = this.mass / 2
    this.size = this.mass * 25
    this.fill = fill
    do {
      this.location = Rnd.location({ max: { x: World.width - this.size * 2, y: World.height - this.size * 2 }, min: { x: this.size, y: this.size } })
    } while (Obstacle.isIntersect(this) == true)
  }

  draw() {
    World.p5.push()
    World.p5.fill(this.fill)
    World.p5.square(this.location.x, this.location.y, this.size)
    World.p5.pop()
  }

  is(compare) {
    return this.id == compare.id
  }
}

export default Obstacle
