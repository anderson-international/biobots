import Bot from './bot'

class Hawk extends Bot {
  constructor(id) {
    super({
      id: id,
      mass: 20,
      maxVelocity: 3.5,
      minVelocity: 1,
      fill: 'red',
    })
  }
}

export default Hawk
