const { createApp } = Vue

const app = createApp({


  data() {

    return {
      arrayEvents: [],
      arrayCategorySet: [],
      nombreIngresado: '',
      arrayUpcoming: [],
      filteredByName: [],
      filteredByCategory: []

    }
  },

  created() {

    const url = (`https://mindhub-xj03.onrender.com/api/amazing`)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //filtro eventos pasados
        const upcomingFiltrados = data.events.filter(evento => evento.date > data.currentDate)
        this.arrayUpcoming = upcomingFiltrados
        //array filtrado solo de categorias
        const category = upcomingFiltrados.map(event => event.category)
        const setCategory = new Set(category)
        const arrayCategory = Array.from(setCategory)
        this.arrayCategorySet = arrayCategory


      })
      .catch(error => console.log(error))

  },

  computed: {
    doubleFilter() {
      let aux = this.arrayUpcoming.filter(event => event.name.toLowerCase().includes(this.nombreIngresado.toLowerCase()))
      this.filteredByName = aux.filter(checks => this.filteredByCategory.includes(checks.category) || (this.filteredByCategory.length == 0))
    },

  }
})
app.mount("#app")

