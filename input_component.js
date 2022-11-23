import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  },
  template: /*html*/`
  <div class="block">
    <input
      class="input"
      type="text"
      placeholder="wprowadź osobę"
      @keyup.enter="store.addNewName()"
      v-model.trim="store.nameInputValue"
    >
  </div>
  <div class="block">
    <button
      class="button is-primary is-light"
      v-on:click="store.addNewName"
    >
      Zatwierdź
    </button>
  </div>
  `
}