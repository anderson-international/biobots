import Bot from './bot'

class Dove extends Bot {
  constructor(id) {
    super({
      id: id,
      mass: 10,
      rangeVelocity: { max: 2.5, min: 1 },
      fill: 'lime',
    })
  }
}

export default Dove
