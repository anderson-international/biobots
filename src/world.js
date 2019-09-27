import * as P5 from 'p5'
import Bot from './bot'
import Obstacle from './obstacle'
import forceBot from './forceBot'
import forceEdge from './forceEdge'
import forceObstacle from './forceObstacle'

class World {
  static width = document.documentElement.clientWidth
  static height = document.documentElement.clientHeight
  static x2 = (this.width / 2) >> 0
  static y2 = (this.height / 2) >> 0
  static x4 = (this.width / 4) >> 0
  static y4 = (this.height / 4) >> 0
  static obstacles = []
  static bots = []
  static p5
  constructor(opts) {
    new P5(p5 => {
      World.p5 = p5
      p5.setup = () => {
        this.setup(opts)
      }
      p5.draw = () => {
        this.draw(opts)
      }
    })
  }

  setup({ botCount = 10, obstacleCount = 10 } = {}) {
    World.p5.createCanvas(World.width, World.height)
    for (var i = 0; i < obstacleCount; i++) {
      World.obstacles.push(new Obstacle({ id: i }))
    }
    World.obstacles.forEach(o => o.setLocation())
    for (var i = 0; i < botCount; i++) {
      World.bots.push(new Bot({ id: i }))
    }
  }

  draw({ background = 41 }) {
    World.p5.background(background)
    for (let obstacle of World.obstacles) {
      obstacle.draw()
    }
    for (let bot of World.bots) {
      forceBot.apply(bot)
      forceEdge.apply(bot)
      forceObstacle.apply(bot)
      bot.move()
      bot.draw()
    }
  }
}

export default World
