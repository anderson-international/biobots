class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static ensure(v) {
    return v.constructor.name == 'Vector' ? v : new Vector(v, v, v)
  }

  static clone(v) {
    return v.constructor.name == 'Vector' ? new Vector(v.x, v.y, v.z) : new Vector(v, v, v)
  }

  add(v) {
    v = Vector.ensure(v)
    this.x += v.x
    this.y += v.y
    this.z += v.z
  }

  divide(v) {
    v = Vector.ensure(v)
    if (this.x != 0) this.x /= v.x
    if (this.y != 0) this.y /= v.y
    if (this.z != 0) this.z /= v.z
  }

  dividePure(v) {
    const clone = Vector.clone(this)
    clone.divide(v)
    return clone
  }

  heading() {
    return -Math.atan2(-this.y, this.x)
  }

  limit(high, low) {
    const m = this.magnitude()
    if (high && m > high) {
      this.normalize()
      this.multiply(high)
    } else if (low && m < low) {
      this.normalize()
      this.multiply(low)
    }
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  multiply(v) {
    v = Vector.ensure(v)
    this.x *= v.x
    this.y *= v.y
    this.z *= v.z
  }

  multiplyPure(v) {
    const clone = Vector.clone(this)
    clone.multiply(v)
    return clone
  }

  normalize() {
    const m = this.magnitude()
    if (m > 0) this.divide(m)
  }

  setZero() {
    this.multiply(0)
  }
}

export default Vector
