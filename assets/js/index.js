let seccion = document.getElementById(`section`);

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
  let template=""
  if(lista.length==0){
    template=`no se encontro la busqueda`
  }
  for (let evento of lista) {
   template+= createCard(evento)
  }
  dondeSeCrea.innerHTML=template
}
createSection(data.events, seccion)




//Search bar

let searchBar = document.getElementById(`search_bar`)

searchBar.addEventListener(`input`, () => {
  doubleFilter()
/*   let eventoFiltradoPorTitulo = filtrarPorNombre(data.events, searchBar.value);
  createSection(eventoFiltradoPorTitulo, seccion)
 */
}
)

// funcion filtrar por nombres

function filtrarPorNombre(lista, busqueda) {
  return lista.filter(evento => evento.name.toLowerCase().includes(busqueda.toLowerCase()))
}


//checkbox

let containerCheckbox = document.getElementById(`contenedor_checkbox`)

//
const category = data.events.map(evento => evento.category)
const setCategory = new Set(category)
const arrayCategory = Array.from(setCategory)

const templateCategory = arrayCategory.reduce((acc, elementoActual, indice) => {
  return acc += `<label for="${indice}">${elementoActual}
  <input class="inputs_checkbox" type="checkbox" name="category" id="${indice}" value="${elementoActual}">
</label>`
}, ``)

containerCheckbox.innerHTML += templateCategory



containerCheckbox.addEventListener(`change`, (e) => {
  doubleFilter()
  /* let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
  const categoriaFiltrada = filtrarCategoria(data.events, checkboxChecked) */
/* 
  createSection(categoriaFiltrada, seccion) */
})



// funcion filtrar por categoria

function filtrarCategoria(eventos, categoria) {
  if (categoria.length == 0) {
    return eventos
  }
  return eventos.filter(evento => categoria.includes(evento.category))
}


// funcion filtros combinados
function doubleFilter(){
  let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
  let inputFunction=filtrarPorNombre(data.events,searchBar.value)
 let inputCategory=filtrarCategoria(inputFunction,checkboxChecked)
  createSection(inputCategory,seccion)
}