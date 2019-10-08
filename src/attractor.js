import Rnd from './rnd'
import World from './world'
import Particle from './particle'

class Attractor extends Particle {
  constructor(id) {
    super({
      id,
      mass: Rnd.next(75, 25),
      fill: 'steelblue',
    })
    this.size = this.mass * 2
    do {
      this.location = Rnd.location({ max: { x: World.width - this.size * 2, y: World.height - this.size * 2 }, min: { x: this.size, y: this.size } })
    } while (Attractor.intersects(this) == true)
  }

  static intersects(a) {
    const x1 = a.location.x
    const y1 = a.location.y
    const r1 = a.size
    for (const b of World.attractors) {
      if (a === b) continue
      const x2 = b.location.x
      const y2 = b.location.y
      const r2 = b.size
      const radius = Math.pow(a.size + b.size, 2)
      if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) < Math.pow(r1 + r2, 2)) return true
    }
  }

  draw() {
    World.p5.push()
    World.p5.fill(this.fill)
    World.p5.circle(this.location.x, this.location.y, this.size)
    World.p5.pop()
  }
}

export default Attractor
