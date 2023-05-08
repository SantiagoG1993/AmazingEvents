let seccion=document.getElementById(`section`);

function createCard (objeto){
    return `<div class="m-4 card col-7 col-sm-6 col-md-4 col-lg-2">
    <img src="${objeto.image}"></img>
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <h2 class="text-center">${objeto.name}</h2>
      <p class="card-text text-center mt-4">Place: ${objeto.place}</p>
        <p class="card-text text-center mt-4">Price: ${objeto.price}</p>
      <a href="./Pages/Details.html"><button type="button" class="btn btn-outline-secondary">Show more</button></a>
    </div>
  </div>`
}


function createSection(lista, dondeSeCrea){
    for (let objeto of data.events){
        dondeSeCrea.innerHTML+=createCard(objeto)
    }
}
createSection(data.events, seccion)