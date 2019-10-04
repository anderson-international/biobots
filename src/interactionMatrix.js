export const matrix = {
  Bot: {
    Bot: { charge: 0.2, power: 2, k: 1000 },
    Attractor: { charge: -1, power: 1, k: 100 },
    Obstacle: { charge: 1, power: 2, k: 10000 },
    Hawk: { charge: 1, power: 2, k: 1000 },
    Edge: { charge: 10, power: 2, k: 100 },
  },
  Hawk: {
    Bot: { charge: -1, power: 2, k: 1000 },
    Obstacle: { charge: 1, power: 2, k: 1000 },
    Edge: { charge: 1, power: 2, k: 100 },
  },
}
