import * as P5 from 'p5'
import Bot from './bot'
import Obstacle from './obstacle'
import Attractor from './attractor'
import forceBot from './forceBot'
import forceEdge from './forceEdge'
import forceObstacle from './forceObstacle'
import forceAttractor from './forceAttractor'

class World {
  static width = document.documentElement.clientWidth
  static height = document.documentElement.clientHeight
  static x2 = (this.width / 2) >> 0
  static y2 = (this.height / 2) >> 0
  static x4 = (this.width / 4) >> 0
  static y4 = (this.height / 4) >> 0
  static obstacles = []
  static attractors = []
  static bots = []
  static p5
  constructor(opts) {
    new P5(p5 => {
      World.p5 = p5
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
    for (var i = 0; i < opts.count.bot; i++) {
      World.bots.push(new Bot({ id: i }))
    }
  }

  draw(opts) {
    World.p5.background(opts.background)
    World.obstacles.forEach(o => o.draw())
    World.attractors.forEach(a => a.draw())
    for (let bot of World.bots) {
      forceBot.apply(bot)
      forceEdge.apply(bot)
      forceObstacle.apply(bot)
      forceAttractor.apply(bot)
      bot.move()
      bot.draw()
    }
  }
}

export default World
