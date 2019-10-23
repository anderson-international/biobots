import settings from './settings.json'
import World from './world'

export function generate() {
  // makeButtonCopySettings()
  makeSelectColoumbicMappings()
}

function makeButtonCopySettings() {
  World.p5
    .createButton('Copy Settings')
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
}

function makeSelectColoumbicMappings() {
  const selectSubject = World.p5.createSelect()
  let selectObject = World.p5.createSelect()

  selectSubject.option('select...')
  Object.keys(settings).forEach(key => selectSubject.option(key))
  selectSubject
    .size(100)
    .position(10, 20)
    .changed(() => {
      clearTextInputs()
      selectObject.remove()
      if (selectSubject.value() === 'World') {
        generateTextInputs(settings[selectSubject.value()], true)
        return
      }
      const subject = settings[selectSubject.value()]
      selectObject = World.p5.createSelect()
      selectObject.option('select...')
      Object.keys(subject).forEach(key => selectObject.option(key))
      selectObject
        .size(100)
        .position(10, 50)
        .changed(() => {
          generateTextInputs(settings[selectSubject.value()]?.[selectObject.value()])
        })
    })
}

function clearTextInputs() {
  World.p5.selectAll('input').forEach(i => i.remove())
  World.p5.selectAll('span').forEach(i => i.remove())
}

function generateTextInputs(source, reset = false) {
  if (source) {
    clearTextInputs()
    var count = 0
    Object.entries(source).forEach(([key, value]) => {
      const input = World.p5
        .createInput(value.toString())
        .size(50)
        .position(120, 20 + 30 * count)
        .changed(() => {
          source[key] = input.value()
          if (reset === true) {
            World.reset()
          }
        })
      World.p5
        .createElement('span', key)
        .position(120 + 60, 20 + 30 * count)
        .style('color:white')
      count++
    })
  }
}
export default { generate }
