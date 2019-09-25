class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static div(v1, v2) {
    v2 = Vector.ensure(v2)
    return new Vector(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z)
  }
  static ensure(v) {
    return v.constructor.name == "Vector" ? v : new Vector(v, v, v)
  }

  add(v) {
    v = Vector.ensure(v)
    this.x += v.x
    this.y += v.y
    this.z += v.z
  }

  div(v) {
    v = Vector.ensure(v)
    this.x /= v.x
    this.y /= v.y
    this.z /= v.z
  }

  heading() {
    return -Math.atan2(-this.y, this.x)
  }

  limit(high, low) {
    const m = this.mag()
    if (high && m > high) {
      this.normalize()
      this.mult(high)
    } else if (low && m < low) {
      this.normalize()
      this.mult(low)
    }
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  mult(v) {
    v = Vector.ensure(v)
    this.x *= v.x
    this.y *= v.y
    this.z *= v.z
  }

  normalize() {
    const m = this.mag()
    if (m > 0) this.div(m)
  }
}

export default Vector
