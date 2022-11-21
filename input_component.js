import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  },
  methods: {
    addName() {
      store.names.push(store.nameInputValue)
      store.nameInputValue = null
    }
  },
  template: /*html*/`
  <div class="block">
    <input
      class="input"
      type="text"
      placeholder="wprowadź osobę"
      @keyup.enter="addName()"
      v-model.trim="store.nameInputValue"
    >
  </div>
  <div class="block">
    <button
      class="button is-primary is-light"
      v-on:click="addName"
    >
      Zatwierdź osobę
    </button>
  </div>
  `
}