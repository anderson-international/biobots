import settings from './settings.json'

const generate = p5 => {
  generateSettings(p5)
}

const generateSettings = p5 => {
  p5.createButton('Copy Settings')
    .size(100)
    .position(10, 10)
    .mousePressed(() => {
      const el = document.createElement('textarea')
      el.value = JSON.stringify(settings)
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })

  const selectSubject = p5.createSelect()
  selectSubject
    .size(100)
    .position(10, 40)
    .changed(() => {
      for (var i = selectObject.elt.options.length - 1; i >= 0; i--) {
        selectObject.elt.remove(i)
      }
      const subject = settings[selectSubject.value()]
      if (subject) {
        selectObject.option('select...')
        Object.keys(subject).forEach(key => selectObject.option(key))
      }
    })
    .option('select...')
  Object.keys(settings).forEach(key => selectSubject.option(key))

  const selectObject = p5.createSelect()
  selectObject
    .size(100)
    .position(10, 70)
    .changed(() => {
      p5.selectAll('input').forEach(i => i.remove())
      p5.selectAll('span').forEach(i => i.remove())
      const object = settings[selectSubject.value()]?.[selectObject.value()]
      if (object) {
        var count = 0
        Object.entries(object).forEach(([key, value]) => {
          const input = p5
            .createInput(value.toString())
            .size(50)
            .position(120, 10 + 30 * count)
            .changed(() => {
              object[key] = input.value()
            })
          p5.createElement('span', key)
            .position(180, 12 + 30 * count)
            .style('color:white')
          count++
        })
      }
    })
}

export default { generate }
