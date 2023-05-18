let eventosNuevos

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
containerCheckbox.innerHTML += templateCategory
createSection(eventosNuevos.events, seccion)
})
.catch(error=>console.log(error))


let seccion = document.getElementById(`section`);



//--------------Search bar

let searchBar = document.getElementById(`search_bar`)

//-----------------checkbox
let containerCheckbox = document.getElementById(`contenedor_checkbox`)


//-crear un array solo con las categorias y sin duplicados

//crear template de checkbox con metodo reduce

/* const templateCategory = arrayCategory.reduce((acc, elementoActual, indice) => {
  return acc += `<label for="${indice}">${elementoActual}
  <input class="inputs_checkbox" type="checkbox" name="category" id="${indice}" value="${elementoActual}">
  </label>`
}, ``) */

//imprimir template en container de checkbox


searchBar.addEventListener(`input`, () => {
  doubleFilter()
}
)
containerCheckbox.addEventListener(`change`, (e) => {
  doubleFilter()
}
)


/* createSection(eventosNuevos.events, seccion) */
function createCard(objeto) {
  return `<div class="m-4 card col-5 col-sm-8 col-md-4 col-lg-4">
    <img src="${objeto.image}"></img>
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <h2 class="text-center">${objeto.name}</h2>
      <p class="card-text text-center mt-4">Place: ${objeto.place}</p>
        <p class="card-text text-center mt-4">Price: ${objeto.price}</p>
      <a href="./Pages/Details.html?id=${objeto._id}"><button type="button" class="btn btn-outline-secondary">Show more</button></a>
    </div>
  </div>`
}

// funcion pintar cards
function createSection(lista, dondeSeCrea) {
  let template = ""
  if (lista.length == 0) {
    template = `Event not found, please try again`
  }
  for (let evento of lista) {
    template += createCard(evento)
  }
  dondeSeCrea.innerHTML = template
}
// funcion filtrar por nombres

function filtrarPorNombre(lista, busqueda) {
  return lista.filter(evento => evento.name.toLowerCase().includes(busqueda.toLowerCase()))
}

// funcion filtrar por categoria

function filtrarCategoria(eventos, categoria) {
  if (categoria.length == 0) {
    return eventos
  }
  return eventos.filter(evento => categoria.includes(evento.category))
}

// funcion filtros combinados

function doubleFilter() {
  let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
  let inputFunction = filtrarPorNombre(eventosNuevos.events, searchBar.value)
  let inputCategory = filtrarCategoria(inputFunction, checkboxChecked)
  createSection(inputCategory, seccion)
}