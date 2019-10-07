import Bot from './bot'

class Dove extends Bot {
  constructor(id) {
    super({
      id: id,
      mass: 10,
      maxVelocity: 4,
      minVelocity: 1,
      fill: 'lime',
    })
  }
}

export default Dove
