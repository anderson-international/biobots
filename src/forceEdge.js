import Vector from './vector'
import World from './world'

const k = 100
const edgeCharge = 10
const left = () => {
  return new Vector(1, 0)
}
const right = () => {
  return new Vector(-1, 0)
}
const top = () => {
  return new Vector(0, 1)
}
const bottom = () => {
  return new Vector(0, -1)
}

const apply = bot => {
  const { x, y } = bot.location
  const c = Math.abs(bot.charge) * edgeCharge
  bot.accelerate(left().multiply(k * (c / Math.pow(x, 2))))
  bot.accelerate(right().multiply(k * (c / Math.pow(World.width - x, 2))))
  bot.accelerate(top().multiply(k * (c / Math.pow(y, 2))))
  bot.accelerate(bottom().multiply(k * (c / Math.pow(World.height - y, 2))))
}

export default { apply }
