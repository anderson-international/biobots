import Vector from '../vector'
import World from '../world'

const k = 1000
const edgeCharge = 10
const left = new Vector(1, 0)
const right = new Vector(-1, 0)
const top = new Vector(0, 1)
const bottom = new Vector(0, -1)

const applyForce = bot => {
  const { x, y } = bot.location
  const c = Math.abs(bot.charge) * edgeCharge
  bot.accelerate(left.multiplyPure(k * (c / Math.pow(x, 2))))
  bot.accelerate(right.multiplyPure(k * (c / Math.pow(World.width - x, 2))))
  bot.accelerate(top.multiplyPure(k * (c / Math.pow(y, 2))))
  bot.accelerate(bottom.multiplyPure(k * (c / Math.pow(World.height - y, 2))))
}

export default { applyForce }
