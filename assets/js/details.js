
const params=new URLSearchParams(document.location.search);
const paramId=params.get(`id`)
const evento=data.events.find(evento=>evento._id==paramId)

document.title=`Details from ${evento.name}`

const main=document.getElementById(`container_main`)

main.innerHTML=` <div  class="card_details d-flex justify-content-center row container-lg ">
<img class="my-5 col-sm-12 col-md-8 col-lg-5" src="${evento.image}">
<div class=" p-3 title_details col-4 col-sm-12 col-md-6 col-lg-6 d-flex flex-column align-items-center justify-content-center">
    <h1 class="text-center">${evento.name}</h1>
    <p>Date: ${evento.date}</p>
    <p>${evento.description}</p>
    <p>Category:${evento.category} </p>
    <p>capacity: ${evento.capacity}</p>
    <p>Assistance: ${evento.estimate}</p>
    <p>Price: ${evento.price}</p>
</div>
</div>`
