export const matrix = {
  Dove: {
    Dove: { charge: 1, power: 2, k: 1000 },
    Attractor: { charge: -1, power: 2, k: 1000 },
    Obstacle: { charge: 1, power: 2, k: 1000 },
    Hawk: { charge: 10, power: 2, k: 1000 },
    Edge: { charge: 1, power: 2, k: 1000 },
  },
  Hawk: {
    Dove: { charge: -5, power: 2, k: 1000 },
    Obstacle: { charge: 10, power: 2, k: 10000 },
    Edge: { charge: 10, power: 2, k: 1000 },
  },
}
