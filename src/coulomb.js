import Vector from './vector'

const k = 1000
const getForce = (subject, object, power = 2, k = 1000) => {
  if (subject.is(object)) return Vector.zero()
  const charge = subject.charge * object.charge
  const force = subject.location.subtractPure(object.location)
  var distance = force.magnitude()
  if (object.size && distance < object.size) distance = object.size
  force.normalize()
  force.multiply(k * (charge / Math.pow(distance, power)))
  return force
}

export default { getForce }
