import World from './world'

const k = 1000
const apply = subject => {
  for (const obstacle of World.obstacles) {
    const charge = subject.charge * obstacle.charge
    const force = subject.location.subtractPure(obstacle.location)
    const distance = force.magnitude()
    force.normalize()
    force.multiply(k * (charge / Math.pow(distance, 2)))
    subject.accelerate(force)
  }
}

export default { apply }
