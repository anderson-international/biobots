import Bot from './bot'

class Hawk extends Bot {
  constructor(id) {
    super({
      id: id,
      mass: 20,
      rangeVelocity: { max: 2, min: 1 },
      fill: 'red',
    })
  }
}

export default Hawk
