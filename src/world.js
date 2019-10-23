import './index.css'
import * as P5 from 'p5'
import 'p5/lib/addons/p5.dom'
import Dove from './dove'
import Hawk from './hawk'
import Obstacle from './obstacle'
import Attractor from './attractor'
import forceEdge from './forceEdge'
import forceCoulomb from './forceCoulomb'
import userInterface from './userInterface'
import settings from './settings.json'

class World {
  static obstacles = []
  static attractors = []
  static doves = []
  static hawks = []
  static p5
  constructor() {
    new P5(p5 => {
      World.p5 = p5
      p5.disableFriendlyErrors = true
      p5.setup = () => {
        this.setup()
      }
      p5.draw = () => {
        this.draw()
      }
      p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
      }
    })
  }

  setup() {
    World.p5.rectMode('center')
    World.p5.noStroke()
    World.p5.createCanvas(World.p5.windowWidth, World.p5.windowHeight)
    userInterface.generate(World.p5)
    World.reset()
  }

  static reset() {
    World.obstacles = []
    for (var id = 0; id < settings.World.obstacles; id++) {
      World.obstacles.push(new Obstacle(id))
    }

    World.attractors = []
    for (var i = 0; i < settings.World.attractors; i++) {
      World.attractors.push(new Attractor({ id: i }))
    }

    World.doves = []
    for (var id = 0; id < settings.World.doves; id++) {
      World.doves.push(new Dove(id))
    }

    World.hawks = []
    for (var id = 0; id < settings.World.hawks; id++) {
      World.hawks.push(new Hawk(id))
    }
  }

  draw() {
    World.p5.background(52)
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
