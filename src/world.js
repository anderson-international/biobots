import './index.css'
import * as P5 from 'p5'
import 'p5/lib/addons/p5.dom'
import Dove from './dove'
import Hawk from './hawk'
import Obstacle from './obstacle'
import Attractor from './attractor'
import forceEdge from './forceEdge'
import forceCoulomb from './forceCoulomb'
import { matrix } from './interaction-matrix'

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
    World.p5.createCanvas(World.p5.windowWidth, World.p5.windowHeight)
    this.generateUserInterface()
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

  generateUserInterface() {
    this.selectSubject = World.p5.createSelect()
    this.selectSubject
      .size(100)
      .position(10, 10)
      .changed(() => {
        for (var i = this.selectObject.elt.options.length - 1; i >= 0; i--) {
          this.selectObject.elt.remove(i)
        }
        const subject = matrix[this.selectSubject.value()]
        if (subject) Object.keys(subject).forEach(key => this.selectObject.option(key))
      })
      .option('select...')

    this.selectObject = World.p5.createSelect()
    this.selectObject
      .size(100)
      .position(10, 40)
      .changed(() => {
        const object = matrix[this.selectSubject.value()]?.[this.selectObject.value()]
        if (object) {
          var count = 1
          Object.entries(object).forEach(([key, value]) => {
            World.p5.selectAll('slider').forEach(slider => slider.remove())
            const slider = World.p5.createSlider(-value * 5, value * 5, value, value / 5)
            slider.position(120, 30 * count)
            count++
          })
        }
      })

    Object.keys(matrix).forEach(key => this.selectSubject.option(key))

    // this.sliderCharge = World.p5.createSlider(-10, 10, 1, 1)
    // this.sliderCharge.position(20, 20)
    // this.sliderPower = World.p5.createSlider(0, 5, 2, 0.5)
    // this.sliderPower.position(20, 50)
    // this.sliderK = World.p5.createSlider(0, 10000, 1000, 100)
    // this.sliderK.position(20, 80)
    // this.sliderDecayUntil = World.p5.createSlider(0, 500, 250, 10)
    // this.sliderDecayUntil.position(20, 110)
    // this.sliderRiseUntil = World.p5.createSlider(0, 500, 120, 10)
    // this.sliderRiseUntil.position(20, 140)
  }
}

export default World
