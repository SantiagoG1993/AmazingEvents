let seccionPast=document.getElementById(`sectionPast`);

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

let pastFiltrados=data.events.filter((evento)=>evento.date<data.currentDate)



//funcion pintar cards

function createSection(lista, dondeSeCrea){
  template=""
  if(lista.length==0){
    template=`Event not found, please try again.`
  }
    for (let evento of lista){
        template+=createCard(evento)
    }
    dondeSeCrea.innerHTML=template
}
createSection(pastFiltrados, seccionPast)


//Search bar
let searchBarPast=document.getElementById("search_bar_past")


searchBarPast.addEventListener(`input`,()=>{
    doubleFilter()
/*   let eventoFiltradoPorTitulo=filtrarPorNombre(pastFiltrados, searchBarPast.value);
  /* createSection(eventoFiltradoPorTitulo, seccionPast) */} 
  )



  //funcion para filtrar por nombre

function filtrarPorNombre(lista, busqueda){
  return lista.filter(evento=>evento.name.toLowerCase().includes(busqueda.toLowerCase()))
}


// checkbox


let containerCheckboxPast=document.getElementById(`container_checkbox_past`)
const category=pastFiltrados.map(evento=> evento.category)

const templateCategory= category.reduce((acc,elementoActual,indice)=>{
  return acc+=`<label for="${indice}">${elementoActual}
  <input  type="checkbox" name="category" id="${indice}" value="${elementoActual}">
</label>`
},``)

containerCheckboxPast.innerHTML+=templateCategory


containerCheckboxPast.addEventListener(`change`, ()=>{
/* let checkboxChecked=Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check=> check.value)
const categoriaFiltrada=filtrarCategoria(pastFiltrados,checkboxChecked )
createSection(categoriaFiltrada, seccionPast) */
doubleFilter()
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
  let inputFunction=filtrarPorNombre(pastFiltrados,searchBarPast.value)
 let inputCategory=filtrarCategoria(inputFunction,checkboxChecked)
 console.log(inputCategory)
  createSection(inputCategory,seccionPast)
}