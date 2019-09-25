import Vector from "./vector"
import World from "./world"

class Rnd {
  static gate(chance) {
    return Math.random() * 100 < chance
  }

  static next(max = 1, min = 0) {
    return Math.random() * max + min
  }

  static location() {
    return new Vector(
      this.next(World.x2 + World.x4, World.x4),
      this.next(World.y2 + World.y4, World.y4)
    )
  }

  static velocity() {
    return new Vector(this.next(20) * this.sign(), this.next(20) * this.sign())
  }

  static sign() {
    return this.gate(50) ? 1 : -1
  }
}

export default Rnd
