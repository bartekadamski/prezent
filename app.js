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
  beforeMount() {
    store.init()
  },
  template: /*html*/
  `
  <section class="hero is-success is-fullheight" v-if="store.encodedString">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-mobile">
          <div class="column"/>
          <div class="column is-three-quarters">
            <img
              src="gift.jpeg"
              alt="gift image"
              id="gift-image">
          </div>
          <div class="column"/>
        </div>
        <p class="subtitle">
          Osoba wylosowana dla
          <b>
            {{store.for}}
          </b>
          to:
        </p>
        <p class="title is-1">
          {{ store.encodedString }}
        </p>
      </div>
    </div>
  </section>

  <div v-else>
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
        <div class="column is-half is-offset-one-quarter" v-if="store.names.length > 0">
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
    </section>

    <section class="section has-text-centered" v-if="store.names.length > 0">
      <div class="block">
        2. Zaznacz kogo może wylosować dana osoba
      </div>
      <div class="block">
        <TableComponent/>
      </div>
    </section>

    <section class="section has-text-centered" v-if="store.names.length > 1">
      <div class="block">
        3. Rozpocznij losowanie
      </div>
      <div class="block">
        <button
          class="button is-primary is-light"
          v-on:click="store.draw"
        >
          Zatwierdź
        </button>
      </div>
      <div class="block" v-if="store.error || store.success">
        Każda osoba obdarowująca i obdarowana wylosowana:
         <b>
           {{ store.checks() }}
         </b>
      </div>
    </section>

    <section class="section has-text-centered" v-if="store.error">
      <div class="block">
        <div class="notification is-danger">
          Wybrane zależności wydają się uniemożliwiać poprawne losowanie.
          Sprawdź je i spróbuj ponownie.
        </div>
      </div>
    </section>

    <section class="section has-text-centered" v-if="store.success">
      <div class="block">
        4. Wyślij link do znajomych
      </div>
      <div class="block">
        <div class="column is-half is-offset-one-quarter">
          <div v-for="giver in store.matrixToDraw" class="block">
            <div class="box">
              Link dla
              <b>
                {{giver.name}}:
              </b>
              <br/>
              <br/>
              <b>
                {{store.link(giver.name, giver.hasDrawn)}}
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  `
}