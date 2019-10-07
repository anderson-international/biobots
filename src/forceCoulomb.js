import Vector from './vector'
import { matrix } from './interaction-matrix'

const apply = (subject, objects) => {
  const interaction = matrix[subject.constructor.name]?.[objects?.[0]?.constructor.name]
  if (!interaction) return

  for (const object of objects) {
    if (subject === object) continue
    subject.accelerate(getForce(subject, object, interaction))
  }
}

const getForce = (subject, object, { charge, power, k }) => {
  const force = subject.location.subtractPure(object.location)
  var distance = force.magnitude()

  if (distance < 50) distance = 50
  else if (distance > 250) distance = 250

  force.normalize()
  force.multiply(k * (charge / Math.pow(distance, power)))
  return force
}

export default { apply }
