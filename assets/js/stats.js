let dataFromJson

let highestAssistanceEvent = document.getElementById(`highest_capacity`)
let lowerPercentage = document.getElementById(`lower_percentage`)
let largerCapacity = document.getElementById(`larger_capacity`)

let secondTable= document.getElementById(`second_table`)
let thirdTable= document.getElementById(`third_table`)

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(response => response.json())
    .then(data => {
        dataFromJson = data


        //---------------------------------------------------highest Assitance
        //creamos array de eventos
        let arrayEvents = Array.from(dataFromJson.events)

        // crear objeto con nombre y porcentaje de asistencia calculado
        let nameAndAssistance = arrayEvents.filter((events) => events.assistance).map(events => ({
            name: events.name,
            assistance: (events.assistance / events.capacity) * 100
        }))

        // comparar elemento actual con siguiente elemento , y con el operador ternario guardar el mayor
        
        const highestAssistance = nameAndAssistance.reduce((currentElement, nextElement) => {
            return currentElement.assistance > nextElement.assistance ? currentElement : nextElement
        })
        //imprimir mayor en el td de la tabla
        highestAssistanceEvent.textContent = `${highestAssistance.name} % ${highestAssistance.assistance}`



        //---------------------------------------------------Lowest Assitance

        const lowestAssistance = nameAndAssistance.reduce((currentElement, nextElement) => {
            return currentElement.assistance < nextElement.assistance ? currentElement : nextElement
        })
        lowerPercentage.textContent = `${lowestAssistance.name} % ${lowestAssistance.assistance}`


        //-----------------------------------------------------Larger Capacity

        const highestCapacity=arrayEvents.reduce((currentElement,nextElement)=>{
            return currentElement.capacity>nextElement.capacity ? currentElement : nextElement
        })
        largerCapacity.textContent=`${highestCapacity.name} ${highestCapacity.capacity}`
        //---------------------------------------------------------------------------------------------------------------------
        
//==TABLA DE UPCOMING==

const upcomingEvents = dataFromJson.events.filter (event => event.date >= dataFromJson.currentDate)
const upcomingCategory = Array.from ( new Set ( upcomingEvents.map (( event) => event.category)))
console.log(upcomingCategory)

//Itera el array de eventos que llega por parametro y por cada elemento a la variable totalRevenue le suma el precio del evento x la asistencia o la asistencia estimada, segun sea evento pasado o futuro
function calcRevenues(events) {
  let totalRevenue = 0;
  events.forEach((event) => {
    totalRevenue += event.price * (event.estimate || event.assistance);
  });
  return totalRevenue;
}

//Itera el array de eventos que llega por parametro y por cada elemento le suma a la variable totalAssistance la asistencia del evento dividido la capacidad, multiplicado por 100
function calcAssistance(events) {
  let totalAssistance = 0;
  events.forEach((event) => {
    totalAssistance += ((event.assistance || event.estimate) / event.capacity) * 100;
  });
  return totalAssistance;
}


function upcomingEventsData(categorias, events) {

    let result = [];

    categorias.map((category) => {
      let categoryEvents = events.filter((event) => category == event.category);
      let revenues = calcRevenues(categoryEvents);
      let assistance  = calcAssistance(categoryEvents);

      result.push({
        category, revenues, assistance: assistance / categoryEvents.length,
      });
    });
    return result;
    
  }

  // ejecutar la funcion pasandole los parametros filtrados al principio
  const infoTableUpcomingEventsConst = upcomingEventsData (upcomingCategory, upcomingEvents); 

  let upcomingTable = document.createElement('table');
  let tBody= document.createElement('tbody');
  upcomingTable.className = " col-12 ";
  upcomingTable.innerHTML = `<tr>
  <th colspan="3" >Upcoming events statistics by category</th>
</tr>
    <tr>
      <th>Categories</th>
      <th>Revenues</th>
      <th>Percentage of attendance</th>
    </tr>
  </thead>`;
  //crear tr por cada elemento del array 
  infoTableUpcomingEventsConst.forEach((eventos) => {
    let createTr = document.createElement('tr');
    createTr.innerHTML = `<td>${eventos.category}</td>
    <td> $ ${eventos.revenues}</td>
    <td>${eventos.assistance.toFixed(1)} %</td>`;
  //agregar tr al tbody
    tBody.appendChild(createTr);
  });
  
  upcomingTable.appendChild(tBody);

  secondTable.append (upcomingTable)

//==TABLA DE PAST==
const pastEvents = dataFromJson.events.filter (event => event.date <= dataFromJson.currentDate)
const pastCategory = Array.from ( new Set ( pastEvents.map (( event) => event.category)))

function infoTablePastEvents(categorias, events) {

    let result = [];

    categorias.map((category) => {
      let categoriaEvents = events.filter((event) => category == event.category);
      let revenues = calculateRevenues(categoriaEvents);
      let assistance = calculateAssistance(categoriaEvents);
      result.push({
        category,revenues,assistance: assistance / categoriaEvents.length,
      });
    });
  
    return result;
  }
  
  function calculateRevenues(events) {
    let totalRevenue = 0;
    events.forEach((event) => {
      totalRevenue += event.price * (event.estimate || event.assistance);
    });
    return totalRevenue;
  }

  function calculateAssistance(events) {
    let totalAssistance = 0;
    events.forEach((event) => {
      totalAssistance += ((event.assistance || event.estimate) / event.capacity) * 100;
    });
    return totalAssistance;
  }
  
  
  const infoTablePastEventsConst = infoTablePastEvents (pastCategory, pastEvents); 

  
  let pastTable = document.createElement('table');
  let upcomingTBody = document.createElement('tbody');
  pastTable.className = " col-12 ";
  pastTable.innerHTML = `<tr>
  <th colspan="3" >Past events statistics by category</th>
</tr>
    <tr>
      <th>Categories</th>
      <th>Revenues</th>
      <th>Percentage of attendance</th>
    </tr>
  </thead>`;


  infoTablePastEventsConst.forEach((eventos) => {
    let crearTr = document.createElement('tr');
    crearTr.innerHTML = `<td>${eventos.category}</td>
    <td> $ ${eventos.revenues}</td>
    <td>${eventos.assistance.toFixed(1)} %</td>`;
    upcomingTBody.appendChild(crearTr);
  });
  
  pastTable.appendChild(upcomingTBody);
  
   thirdTable.append (pastTable)

     })

    .catch(err => console.log(err))

