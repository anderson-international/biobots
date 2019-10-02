import World from './world'
import coulomb from './coulomb'

const power = 1
const k = 100
const apply = subject => {
  World.attractors.forEach(object => subject.accelerate(coulomb.getForce(subject, object, power, k)))
}

export default { apply }
