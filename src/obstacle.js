import Rnd from './rnd'
import World from './world'
import Particle from './particle'

class Obstacle extends Particle {
  constructor(id) {
    super({
      id,
      mass: Rnd.next(75, 25),
      fill: 'gray',
    })
    this.size = this.mass * 2
    do {
      this.location = Rnd.location({
        max: { x: World.p5.windowWidth - this.size * 2, y: World.p5.windowHeight - this.size * 2 },
        min: { x: this.size, y: this.size },
      })
    } while (Obstacle.isIntersect(this) == true)
  }

  draw() {
    World.p5.push()
    World.p5.fill(this.fill)
    World.p5.square(this.location.x, this.location.y, this.size)
    World.p5.pop()
  }

  static isIntersect(a) {
    const ax1 = a.location.x - a.size / 2
    const ay1 = a.location.y - a.size / 2
    const ax2 = ax1 + a.size
    const ay2 = ay1 + a.size
    for (const b of World.obstacles) {
      if (a === b) continue
      const bx1 = b.location.x - b.size / 2
      const by1 = b.location.y - b.size / 2
      const bx2 = bx1 + b.size
      const by2 = by1 + b.size
      if (ax1 <= bx2 && ax2 >= bx1 && ay1 <= by2 && ay2 >= by1) return true
    }
  }
}

export default Obstacle
