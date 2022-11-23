import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const store = reactive({
  names: [],
  nameInputValue: null,
  matrix: [],
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
  disableName(giver, receiver) {
    let giver_data = store.matrix.find((element) => { return element.name === giver })
    giver_data.possibleRecipients = giver_data.possibleRecipients.filter((el) => { return el !== receiver })
  },
  enableName(giver, receiver) {
    store.matrix.find((element) => { return element.name === giver }).possibleRecipients.push(receiver)
  }
})