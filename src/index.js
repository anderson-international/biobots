import '@babel/polyfill'
import World from './world'

new World({
  background: 51,
  count: {
    dove: 50,
    hawk: 1,
    obstacle: 0,
    attractor: 3,
  },
})
