import '@babel/polyfill'
import World from './world'

new World({
  background: 51,
  count: {
    bot: 50,
    obstacle: 5,
    attractor: 2,
  },
})
