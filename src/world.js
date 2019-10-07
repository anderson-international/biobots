import * as P5 from 'p5'
import Dove from './dove'
import Hawk from './hawk'
import Obstacle from './obstacle'
import Attractor from './attractor'
import forceEdge from './forceEdge'
import forceCoulomb from './forceCoulomb'

class World {
  static width = document.documentElement.clientWidth
  static height = document.documentElement.clientHeight
  static x2 = (this.width / 2) >> 0
  static y2 = (this.height / 2) >> 0
  static x4 = (this.width / 4) >> 0
  static y4 = (this.height / 4) >> 0
  static obstacles = []
  static attractors = []
  static doves = []
  static hawks = []
  static p5
  constructor(opts) {
    new P5(p5 => {
      World.p5 = p5
      p5.disableFriendlyErrors = true
      p5.setup = () => {
        p5.rectMode('center')
        this.setup(opts)
      }
      p5.draw = () => {
        this.draw(opts)
      }
    })
  }

  setup(opts) {
    World.p5.createCanvas(World.width, World.height)
    for (var i = 0; i < opts.count.obstacle; i++) {
      World.obstacles.push(new Obstacle({ id: i }))
    }
    for (var i = 0; i < opts.count.attractor; i++) {
      World.attractors.push(new Attractor({ id: i }))
    }
    for (var id = 0; id < opts.count.dove; id++) {
      World.doves.push(new Dove(id))
    }
    for (var id = 0; id < opts.count.hawk; id++) {
      World.hawks.push(new Hawk(id))
    }
  }

  draw(opts) {
    World.p5.background(opts.background)
    World.obstacles.forEach(o => o.draw())
    World.attractors.forEach(a => a.draw())

    for (let dove of World.doves) {
      forceCoulomb.apply(dove, World.doves)
      forceCoulomb.apply(dove, World.hawks)
      forceCoulomb.apply(dove, World.obstacles)
      forceCoulomb.apply(dove, World.attractors)
      forceEdge.apply(dove)
      dove.move()
      dove.draw()
    }

    for (let hawk of World.hawks) {
      forceCoulomb.apply(hawk, World.doves)
      forceCoulomb.apply(hawk, World.hawks)
      forceCoulomb.apply(hawk, World.obstacles)
      forceEdge.apply(hawk)
      hawk.move()
      hawk.draw()
    }
  }
}

export default World
