
const { createApp } = Vue
const app = createApp({


  data() {

    return {
      arrayEvents: [],
      arrayCategorySet: [],

      nombreIngresado: "",
      filteredByName: [],
      filteredByCategory: [],
    }
  },

  created() {


    let dataFromJason
    const url = (`https://mindhub-xj03.onrender.com/api/amazing`)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.arrayEvents = data.events
        const category = data.events.map(event => event.category)
        const setCategory = new Set(category)
        const arrayCategory = Array.from(setCategory)
        this.arrayCategorySet = arrayCategory

      })
      .catch(error => console.log(error))
console.log(app)
  },
  computed: {
    doubleFilter() {
      let aux = this.arrayEvents.filter(event => event.name.toLowerCase().includes(this.nombreIngresado.toLowerCase()))
      this.filteredByName = aux.filter(checks => this.filteredByCategory.includes(checks.category) || (this.filteredByCategory.length == 0))
    },
  }

})
app.mount("#app")

