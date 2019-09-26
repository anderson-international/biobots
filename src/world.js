import * as P5 from 'p5'
import Bot from './bot'
import edgeRepulse from './forces/edgeRepulse'

class World {
  static width = document.documentElement.clientWidth
  static height = document.documentElement.clientHeight
  static x2 = (this.width / 2) >> 0
  static y2 = (this.height / 2) >> 0
  static x4 = (this.width / 4) >> 0
  static y4 = (this.height / 4) >> 0

  bots = []

  constructor(opts) {
    new P5(p5 => {
      p5.setup = () => {
        this.setup(p5, opts)
      }
      p5.draw = () => {
        this.draw(p5, opts)
      }
    })
  }

  setup(p5, { botcount = 10 } = {}) {
    p5.createCanvas(World.width, World.height)
    for (var i = 0; i < botcount; i++) {
      this.bots.push(new Bot())
    }
  }

  draw(p5, { background = 41 }) {
    p5.background(background)
    for (let bot of this.bots) {
      edgeRepulse.applyForce(bot)
      bot.move()
      bot.draw(p5)
    }
  }
}

export default World
