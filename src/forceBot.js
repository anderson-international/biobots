import World from './world'
import coulomb from './coulomb'

const power = 2
const k = 10000
const apply = subject => {
  World.bots.forEach(object => subject.accelerate(coulomb.getForce(subject, object, power, k)))
}

export default { apply }
