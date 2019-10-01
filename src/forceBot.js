import World from './world'

const k = 10000
const apply = subject => {
  for (const bot of World.bots) {
    if (subject.is(bot)) continue

    const charge = subject.charge * bot.charge
    const force = subject.location.subtractPure(bot.location)
    const distance = force.magnitude()
    force.normalize()
    force.multiply(k * (charge / Math.pow(distance, 2)))
    subject.accelerate(force)
  }
}

export default { apply }
