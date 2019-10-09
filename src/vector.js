class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(v) {
    const x = v.x ?? v
    const y = v.y ?? v
    this.x += v.x
    this.y += v.y
    return this
  }

  divide(v) {
    const x = v.x ?? v
    const y = v.y ?? v
    if (x != 0) this.x /= x
    if (y != 0) this.y /= y
    return this
  }

  heading() {
    return -Math.atan2(-this.y, this.x)
  }

  limit(range) {
    const m = this.magnitude(range)
    this.normalize()
    this.multiply(m)
  }

  magnitude({ min, max } = {}) {
    var m = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    if (min && m < min) return min
    if (max && m > max) return max
    return m
  }

  multiply(v) {
    const x = v.x ?? v
    const y = v.y ?? v
    this.x *= x
    this.y *= y
    return this
  }

  multiplyPure(v) {
    const x = v.x ?? v
    const y = v.y ?? v
    return new Vector(this.x * x, this.y * y)
  }

  normalize() {
    this.divide(this.magnitude())
  }

  subtract(v) {
    const x = v.x ?? v
    const y = v.y ?? v
    this.x -= x
    this.y -= y
    return this
  }

  subtractPure(v) {
    const x = v.x ?? v
    const y = v.y ?? v
    return new Vector(this.x - x, this.y - y)
  }
}

export default Vector
