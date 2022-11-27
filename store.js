import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const store = reactive({
  names: [],
  nameInputValue: null,
  matrix: [],
  matrixToDraw: [],
  addNewName() {
    let newName = store.nameInputValue
    store.nameInputValue = null
    store.matrix.forEach((element) => { element.possibleRecipients.push(newName) })
    store.matrix.push(
      {
        name: newName,
        possibleRecipients: [...store.names]
      }
    )
    store.matrix.sort((a, b) => {
      if(a.name > b.name) {
        return 1
      } else if(a.name < b.name) {
        return -1
      } else {
        return 0
      }
    })
    store.names.push(newName)
    store.names.sort()
    store.error = false
  },
  disableName(giver, receiver, source) {
    let giver_data = store.findGiverByName(giver, source)
    giver_data.possibleRecipients = giver_data.possibleRecipients.filter((el) => { return el !== receiver })
  },
  enableName(giver, receiver) {
    store.findGiverByName(giver, store.matrix).possibleRecipients.push(receiver)
  },
  findGiverByName(name, source) {
    return source.find((element) => { return element.name === name })
  },
  draw() {
    store.matrixToDraw = JSON.parse(JSON.stringify(store.matrix)) // deep copy
    store.error = false

    for (let i = 0; i < store.matrixToDraw.length; i++) {
      let giver = store.findGiverWithLeastPossibleRecipients()
      if (store.error) {
        break
      }

      let receiver = store.randomArrayElement(giver.possibleRecipients)
      giver.hasDrawn = receiver
      store.matrixToDraw.forEach((el) => { store.disableName(el.name, receiver, store.matrixToDraw) })
    }
  },
  findGiverWithLeastPossibleRecipients() {
    let giversThatHasntDrawn = store.matrixToDraw.filter((el) => { return el.hasDrawn === undefined })
    let min = Math.min(...giversThatHasntDrawn.map((el) => { return el.possibleRecipients.length }))

    if(min == 0) {
      return store.error = true;
    }

    let nextGiversToDraw = giversThatHasntDrawn.filter((el) => { return el.possibleRecipients.length === min })
    return store.randomArrayElement(nextGiversToDraw)
  },
  randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
})