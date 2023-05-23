/* let seccionPast=document.getElementById(`sectionPast`);

function createCard (objeto){
    return `<div class="m-4 card col-7 col-sm-6 col-md-4 col-lg-3">
    <img src="${objeto.image}"></img>
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <h2 class="text-center">${objeto.name}</h2>
      <p class="card-text text-center mt-4">Place: ${objeto.place}</p>
        <p class="card-text text-center mt-4">Price: ${objeto.price}</p>
        <p class="card-text text-center mt-4">Date: ${objeto.date}</p>
        <p class="bg-danger rounded p-2 text-white">Past event!</p>
        <a href="../Pages/Details.html?id=${objeto._id}"><button type="button" class="btn btn-outline-secondary">Show more</button></a>
    </div>
  </div>`
}


let eventosNuevos

let pastFiltrados
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
.then(response=>response.json())
.then(data=>{
  eventosNuevos=data
  const category = eventosNuevos.events.map(evento => evento.category)
const setCategory = new Set(category)
const arrayCategory = Array.from(setCategory)
const templateCategory = arrayCategory.reduce((acc, elementoActual, indice) => {
  return acc += `<label for="${indice}">${elementoActual}
  <input class="inputs_checkbox" type="checkbox" name="category" id="${indice}" value="${elementoActual}">
  </label>`
}, ``)
containerCheckboxPast.innerHTML += templateCategory
pastFiltrados=eventosNuevos.events.filter((evento)=>evento.date<data.currentDate)
createSection(pastFiltrados, seccionPast)

})
.catch(error=>console.log(error))


function createSection(lista, dondeSeCrea){
  template=""
  if(lista.length==0){
    template=`Event not found, please try again.`
  }
    for (let evento of lista){
        template+=createCard(evento)
    }
    dondeSeCrea.innerHTML=template */
/* } */
/* createSection(pastFiltrados, seccionPast)
 */
/* 
let searchBarPast=document.getElementById("search_bar_past")
 */

/* searchBarPast.addEventListener(`input`,()=>{
    doubleFilter()
  let eventoFiltradoPorTitulo=filtrarPorNombre(pastFiltrados, searchBarPast.value);
   createSection(eventoFiltradoPorTitulo, seccionPast) } 
  ) */

/* 
function filtrarPorNombre(lista, busqueda){
  return lista.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase()))
}
 let containerCheckboxPast=document.getElementById(`container_checkbox_past`) */
/* const category=pastFiltrados.map(evento=> evento.category)

const templateCategory= category.reduce((acc,elementoActual,indice)=>{
  return acc+=`<label for="${indice}">${elementoActual}
  <input  type="checkbox" name="category" id="${indice}" value="${elementoActual}">
</label>`
},``)

containerCheckboxPast.innerHTML+=templateCategory */

/* 
containerCheckboxPast.addEventListener(`change`, ()=>{ */
/* let checkboxChecked=Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check=> check.value)
const categoriaFiltrada=filtrarCategoria(pastFiltrados,checkboxChecked )
createSection(categoriaFiltrada, seccionPast) */
/* doubleFilter()
})

function filtrarCategoria(eventos, categoria){
  if(categoria.length==0){
    return eventos
  }
return eventos.filter(evento=> categoria.includes(evento.category))
}

function doubleFilter(){
  let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
  let inputFunction=filtrarPorNombre(pastFiltrados,searchBarPast.value)
 let inputCategory=filtrarCategoria(inputFunction,checkboxChecked)
 
  createSection(inputCategory,seccionPast)
} */

const { createApp } = Vue

const app = createApp({



  data() {

    return {
      arrayEvents: [],
      arrayCategorySet: [],
      pastFiltered: [],
      nombreIngresado: '',
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
        const pastFiltrados = data.events.filter(evento => evento.date < data.currentDate)
        this.pastFiltered = pastFiltrados
        //array filtrado solo de categorias
        const category = pastFiltrados.map(event => event.category)
        const setCategory = new Set(category)
        const arrayCategory = Array.from(setCategory)
        this.arrayCategorySet = arrayCategory

      })
      .catch(error => console.log(error))

  },
  computed: {
    filtrarPorInput() {
      let aux = this.pastFiltered.filter(event => event.name.toLowerCase().includes(this.nombreIngresado.toLowerCase()))
      this.filteredByName = aux.filter(checks => this.filteredByCategory.includes(checks.category) || (this.filteredByCategory.length == 0))
    },

  }

})
app.mount("#app")

