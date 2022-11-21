import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const store = reactive({
  names: [], // "Zenon",  "Stefania", "Karol", "Kamil"
  nameInputValue: null
})