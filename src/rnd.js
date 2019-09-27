import Vector from './vector'
import World from './world'

class Rnd {
  static gate(chance = 50) {
    return Math.random() * 100 < chance
  }

  static next(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  static location({ max, min } = {}) {
    return new Vector(this.next(max.x, min.x), this.next(max.y, min.y))
  }

  static velocity(max = 20) {
    return new Vector(this.next(max) * this.sign(), this.next(max) * this.sign())
  }

  static sign() {
    return this.gate() ? 1 : -1
  }
}

export default Rnd
