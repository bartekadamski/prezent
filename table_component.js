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
        <table class="table is-striped is-hoverable" style="display: inline-block;">
          <tbody>
            <tr v-for="giver in store.matrix">
              <th>{{giver.name}}</th>
              <td v-for="name in store.names">
                <span
                  class="tag is-success"
                  v-if="giver.possibleRecipients.includes(name)"
                  @click="store.disableName(giver.name, name, store.matrix)"
                >
                  {{name}}
                </span>
                <span
                  class="tag is-light"
                  v-else
                  @click="store.enableName(giver.name, name)"
                >
                  {{name}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `
}