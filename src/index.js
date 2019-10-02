import '@babel/polyfill'
import World from './world'

new World({
  background: 51,
  count: {
    bot: 200,
    obstacle: 3,
    attractor: 3,
  },
})
