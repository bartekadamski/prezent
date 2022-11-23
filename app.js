import TableComponent from './table_component.js'
import InputComponent from './input_component.js'
import { store } from './store.js'

export default {
  components: {
    TableComponent, InputComponent
  },
  data() {
    return {
      store
    }
  },
  template: /*html*/
  `
  <section class="section has-text-centered">
    <h1 class="title is-1">
      Prezent
    </h1>
    <p class="subtitle">
      Losowanie
    </p>
  </section>

  <section class="section has-text-centered">
    <div class="columns is-multiline">
      <div class="column is-half is-offset-one-quarter">
        <div class="block">
          1. Wpisz unikalną nazwę dla osoby, która ma brać udział w losowaniu
        </div>
        <InputComponent/>
      </div>
      <div class="column is-half is-offset-one-quarter">
        <div class="box">
          <div class="block">
            Wprowadzone osoby:
          </div>
          <div class="block">
            <div class="tags">
              <span v-for="name in store.names" class="tag is-medium">{{ name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="section has-text-centered" v-if="store.names.length > 0">
      <div class="block">
        2. Zaznacz kogo może wylosować dana osoba
      </div>
      <div class="block">
        <TableComponent/>
      </div>
    </section>
  </section>
  `
}