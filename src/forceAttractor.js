import World from './world'

const k = 100
const apply = subject => {
  for (const attractor of World.attractors) {
    const charge = subject.charge * attractor.charge
    const force = subject.location.subtractPure(attractor.location)
    const distance = force.magnitude()
    if (distance < attractor.size) distance = attractor.size
    force.normalize()
    force.multiply(k * (charge / distance))
    subject.accelerate(force)
  }
}

export default { apply }
