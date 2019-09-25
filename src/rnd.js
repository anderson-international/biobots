import Vector from "./vector"
import World from "./world"

class Rnd {
  static gate(chance) {
    return Math.random() * 100 < chance
  }

  static next(max = 1, min = 0) {
    return Math.random() * max + min
  }

  static location(margin = 0) {
    return new Vector(
      this.next(World.width - margin, margin),
      this.next(World.height - margin, margin)
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
