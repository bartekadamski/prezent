import Table from './table.js'
import Input from './input.js'

export default {
  components: {
    Table, Input
  },
  data() {
    return {
      names: ["Zenon",  "Stefania", "Karol", "Kamil", "Ola"]
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
          1. Wpisz unikalną nazwę dla osoby, które ma brać udział w losowaniu
        </div>
        <div class="block">
          <Input/>
        </div>
        <div class="block">
          <button class="button is-primary is-light">Zatwierdź osobę</button>
        </div>
      </div>
      <div class="column is-half is-offset-one-quarter">
        <div class="box">
          <div class="block">
            Wprowadzone osoby:
          </div>
          <div class="block">
            <div class="tags">
              <span v-for="name in names" class="tag is-medium">{{ name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="section has-text-centered">
      <div class="block">
        2. Zaznacz kto może kogo wylosować
      </div>
      <div class="block">
        <Table/>
      </div>
    </section>
  </section>
  `
}