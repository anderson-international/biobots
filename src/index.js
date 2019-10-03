import '@babel/polyfill'
import World from './world'

new World({
  background: 51,
  count: {
    bot: 100,
    obstacle: 5,
    attractor: 3,
  },
})
