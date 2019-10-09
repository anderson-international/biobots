import * as P5 from 'p5'
import Dove from './dove'
import Hawk from './hawk'
import Obstacle from './obstacle'
import Attractor from './attractor'
import forceEdge from './forceEdge'
import forceCoulomb from './forceCoulomb'
import './index.css'

class World {
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
        this.setup(opts)
      }
      p5.draw = () => {
        this.draw(opts)
      }
      p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
      }
    })
  }

  setup(opts) {
    World.p5.rectMode('center')
    World.p5.noStroke()
    const canvas = World.p5.createCanvas(World.p5.windowWidth, World.p5.windowHeight)
    for (var id = 0; id < opts.count.obstacle; id++) {
      World.obstacles.push(new Obstacle(id))
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
