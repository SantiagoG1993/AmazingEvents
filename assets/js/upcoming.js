let seccionUpcoming=document.getElementById(`sectionUpcoming`);

function createCard (objeto){
    return `<div class="m-4 card col-7 col-sm-6 col-md-4 col-lg-3">
    <img src="${objeto.image}"></img>
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <h2 class="text-center">${objeto.name}</h2>
      <p class="card-text text-center mt-4">Place: ${objeto.place}</p>
        <p class="card-text text-center mt-4">Price: ${objeto.price}</p>
        <p class="card-text text-center mt-4">Date: ${objeto.date}</p>
        <p class="bg-success rounded p-2 text-white">Upcoming!</p>
        <a href="../Pages/Details.html?id=${objeto._id}"><button type="button" class="btn btn-outline-secondary">Show more</button></a>
    </div>
  </div>`
}
const upcomingFiltrados=data.events.filter((evento)=>evento.date>data.currentDate)

// funcion pintar cards

function createSection(lista, dondeSeCrea) {
  let template=""
  if(lista.length==0){
    template=`Event not found, please try again.`
  }
  dondeSeCrea.innerHTML = ""
  for (let evento of lista) {
   template+= createCard(evento)
  }
  dondeSeCrea.innerHTML=template
}
createSection(upcomingFiltrados, seccionUpcoming)



//Search bar

let searchBarUpcoming=document.getElementById(`search_bar_upcoming`)


searchBarUpcoming.addEventListener(`input`,()=>{
  doubleFilter()}
/* let eventoFiltradoPorTitulo=filtrarPorNombre(upcomingFiltrados, searchBarUpcoming.value);
createSection(eventoFiltradoPorTitulo, seccionUpcoming)} */
)


// funcion filtrar por nombres
function filtrarPorNombre(lista, busqueda){
  return lista.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase()))
}



// checkbox
let containerCheckboxUpcoming=document.getElementById(`container_checkbox_upcoming`)

const category=upcomingFiltrados.map(evento=> evento.category)
/* const setCategory= new Set( category)
const arrayCategory= Array.from(setCategory) */

const templateCategory= category.reduce((acc,elementoActual,indice)=>{
  return acc+=`<label for="${indice}">${elementoActual}
  <input  type="checkbox" name="category" id="${indice}" value="${elementoActual}">
</label>`
},``)

containerCheckboxUpcoming.innerHTML+=templateCategory


containerCheckboxUpcoming.addEventListener(`change`, ()=>{
  doubleFilter()
/* let checkboxChecked=Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check=> check.value)
const categoriaFiltrada=filtrarCategoria(upcomingFiltrados,checkboxChecked )
createSection(categoriaFiltrada, seccionUpcoming) */
})


// funcion filtrar por categoria

function filtrarCategoria(eventos, categoria){
  if(categoria.length==0){
    return eventos
  }
return eventos.filter(evento=> categoria.includes(evento.category))
}


// funcion filtros combinados

function doubleFilter(){
  let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
  let inputFunction=filtrarPorNombre(upcomingFiltrados,searchBarUpcoming.value)
 let inputCategory=filtrarCategoria(inputFunction,checkboxChecked)
  createSection(inputCategory,seccionUpcoming)
}

