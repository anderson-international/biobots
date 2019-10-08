import Rnd from './rnd'
import World from './world'

class Particle {
  constructor({ id, mass, size, fill, location }) {
    this.id = id
    this.mass = mass
    this.fill = fill
  }
}

export default Particle
