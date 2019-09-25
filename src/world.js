import * as P5 from "p5"
import Bot from "./bot"

class World {
  static width = document.documentElement.clientWidth
  static height = document.documentElement.clientHeight
  static midX = (this.width / 2) >> 0
  static midY = (this.height / 2) >> 0
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

  setup(p5, { background = 41, botcount = 10 } = {}) {
    p5.createCanvas(World.width, World.height)
    p5.background(background)
    for (var i = 0; i < botcount; i++) {
      this.bots.push(new Bot())
    }
  }

  draw(p5) {
    for (let bot of this.bots) {
      bot.move()
      bot.draw(p5)
    }
  }
}

export default World
