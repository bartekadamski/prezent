import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const store = reactive({
  names: [],
  nameInputValue: null,
  matrix: [],
  matrixToDraw: [],
  error: false,
  success: false,
  encoding: null,
  encodedString: null,
  for: null,
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
    store.success = false

    for (let i = 0; i < store.matrixToDraw.length; i++) {
      let giver = store.findGiverWithLeastPossibleRecipients()
      if (store.error) {
        return
      }

      let receiver = store.randomArrayElement(giver.possibleRecipients)
      giver.hasDrawn = receiver
      store.matrixToDraw.forEach((el) => { store.disableName(el.name, receiver, store.matrixToDraw) })
    }

    store.success = true
  },
  findGiverWithLeastPossibleRecipients() {
    let giversThatHasntDrawn = store.matrixToDraw.filter((el) => { return el.hasDrawn === undefined })
    let min = Math.min(...giversThatHasntDrawn.map((el) => { return el.possibleRecipients.length }))

    if(min == 0) {
      store.error = true
      store.success = false
      return
    }

    let nextGiversToDraw = giversThatHasntDrawn.filter((el) => { return el.possibleRecipients.length === min })
    return store.randomArrayElement(nextGiversToDraw)
  },
  randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  },
  link(giver_name, receiver_name) {
    let base = window.location.origin
    let params = new URLSearchParams(
      {
        "encoding": "base64",
        "for": encodeURIComponent(giver_name),
        "result": store.encode(receiver_name) })
    return base + "?" + params.toString()
  },
  encode(input) {
    return window.btoa(encodeURIComponent(input))
  },
  decode(input) {
    return decodeURIComponent(window.atob(input))
  },
  init() {
    let params = new URLSearchParams(window.location.search)
    store.encoding = params.get("encoding") || "base64"
    if(params.get("result")) {
      store.encodedString = store.decode(params.get("result"))
      store.for = decodeURIComponent(params.get("for"))
    }
  },
  checks() {
    let length = store.names.length
    let giversNamesThatHasDrawn = store.matrixToDraw.filter((el) => { return el.hasDrawn != undefined })
    let receiverNames = giversNamesThatHasDrawn.map((el) => { return el.hasDrawn })
    let giverNames = giversNamesThatHasDrawn.map((el) => { return el.name })

    if(receiverNames.length == length && giverNames.length == length) {
      console.log(receiverNames)
      console.log(giverNames)
      return "TAK"
    } else {
      return "NIE"
    }
  }
})