const k = 1000
const applyForce = (bots, subject) => {
  for (const bot of bots) {
    if (subject.is(bot)) continue
    const charge = subject.charge * bot.charge
    const force = subject.location.subtractPure(bot.location)
    const distance = force.magnitude()
    force.normalize()
    force.multiply(k * (charge / Math.pow(distance, 2)))
    subject.accelerate(force)
  }
}

export default { applyForce }
