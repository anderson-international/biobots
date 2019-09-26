import Vector from '../vector'
import World from '../world'

const k = 1000
const edges = {
  charge: 10,
  left: new Vector(1, 0),
  right: new Vector(-1, 0),
  top: new Vector(0, 1),
  bottom: new Vector(0, -1),
}

const applyForce = bot => {
  const { x, y } = bot.location
  const c = Math.abs(bot.charge) * edges.charge
  bot.accelerate(edges.left.multiplyPure(k * (c / Math.pow(x, 2))))
  bot.accelerate(edges.right.multiplyPure(k * (c / Math.pow(World.width - x, 2))))
  bot.accelerate(edges.top.multiplyPure(k * (c / Math.pow(y, 2))))
  bot.accelerate(edges.bottom.multiplyPure(k * (c / Math.pow(World.height - y, 2))))
}

export default { applyForce }
