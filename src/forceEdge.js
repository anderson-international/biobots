import Vector from './vector'
import World from './world'
import { matrix } from './interaction-matrix'

const left = () => {
  return new Vector(1, 0)
}
const right = () => {
  return new Vector(-1, 0)
}
const top = () => {
  return new Vector(0, 1)
}
const subjecttom = () => {
  return new Vector(0, -1)
}

const apply = subject => {
  const { x, y } = subject.location
  const { charge, power, k } = matrix[subject.constructor.name]['Edge']
  subject.accelerate(left().multiply(k * (charge / Math.pow(x, power))))
  subject.accelerate(right().multiply(k * (charge / Math.pow(World.p5.windowWidth - x, power))))
  subject.accelerate(top().multiply(k * (charge / Math.pow(y, power))))
  subject.accelerate(subjecttom().multiply(k * (charge / Math.pow(World.p5.windowHeight - y, power))))
}

export default { apply }
