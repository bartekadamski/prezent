export default {
  data() {
    return {
      names: ["Zenon",  "Stefania", "Karol", "Kamil", "Ola"]
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
              <th></th>
              <th v-for="name in names">{{name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="name in names">
              <th>{{name}}</th>
              <td v-for="name in names">
                <span class="tag is-success">Tak</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `
}