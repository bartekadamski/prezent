import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  },
  template: /*html*/
  `
  <div class="columns">
    <div class="column is-full" >
      <div class="table-container">
        <table class="table is-bordered is-striped" style="display: inline-block;">
          <thead>
            <tr>
              <th>Kto?</th>
              <th v-for="name in store.names"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="name_for_row in store.names">
              <th>{{name_for_row}}</th>
              <td v-for="name_for_cell in store.names">
                <span class="tag is-success" v-if="name_for_row !== name_for_cell">{{name_for_cell}}</span>
                <span class="tag is-danger" v-else>{{name_for_cell}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `
}