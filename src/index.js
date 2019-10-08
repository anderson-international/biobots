import '@babel/polyfill'
import World from './world'

new World({
  background: 51,
  count: {
    dove: 100,
    hawk: 0,
    obstacle: 0,
    attractor: 1,
  },
})
