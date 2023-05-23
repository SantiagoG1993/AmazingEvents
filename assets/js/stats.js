const {createApp} = Vue

const app= createApp({

  data(){

    return{
      arrayEvents:[],
      arrayCategorySet:[],

      highestPercentage:[],
      lowestPercentage:[],
      largerCapacity:[],
      nameAndAssistance:[],

      upcomingEvents:{},
      upcomingCategory:[],
      pastEvents:[],
      pastCategory:[],

      dataFromJson:[],

      arrayEventInfo:[],
      arrayEventInfoPast:[]
    }
  },
  
  created(){

    const url=(`https://mindhub-xj03.onrender.com/api/amazing`)
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
      this.dataFromJson=data
     this.arrayEvents=data.events
     
      //Array con nombre, asistencia y capacidad del evento futuro
      this.nameAndAssistance=this.arrayEvents.filter((events) => events.assistance).map(events => ({
        name: events.name,
        assistance: ((events.assistance / events.capacity) * 100).toFixed(2),
        capacity:events.capacity,
      }))
      //highest  assistance
      this.highestPercentage = this.nameAndAssistance.reduce((currentElement, nextElement) => {
        return currentElement.assistance > nextElement.assistance ? currentElement : nextElement
      })
      //lowest assistance
      this.lowestPercentage=this.nameAndAssistance.reduce((currentElement, nextElement)=>{
        return currentElement.assistance < nextElement.assistance ? currentElement : nextElement
      })
      //larger Capacity
      this.largerCapacity=this.nameAndAssistance.reduce((currentElement, nextElement)=>{
        return currentElement.capacity>nextElement.capacity ? currentElement : nextElement
      })

      //array con eventos upcoming
      this.upcomingEvents = this.arrayEvents.filter(event => event.date >= this.dataFromJson.currentDate)
      //array con categorias upcoming
      this.upcomingCategory = Array.from(new Set(this.upcomingEvents.map((event) => event.category))) 
      //array con eventos past
      this.pastEvents = this.arrayEvents.filter(event => event.date <= this.dataFromJson.currentDate)
      //array con categorias past
      this.pastCategory = Array.from(new Set(this.pastEvents.map((event) => event.category))) 
    


      //llamado a las funciones
      this.generateEventInfo()
      this.generateEventInfoPast() 

      console.log(this.arrayEventInfoPast)
    })
    .catch(error=>console.log(error))
  },
  methods:{
   generateEventInfo() {

      const eventInfo = [];
      this.upcomingCategory.forEach((category) => {
        const eventsUp = this.upcomingEvents.filter((event) => event.category === category);
        let totalRevenue = 0;
        let totalAssistance = 0;
    
        eventsUp.forEach((event) => {
          totalRevenue += (event.estimate * event.price);
          totalAssistance += ((event.estimate / event.capacity) * 100);
        });
    
        const averageAssistance = totalAssistance / eventsUp.length;
    
        eventInfo.push({
          category: category,
          totalRevenue: totalRevenue.toLocaleString(),
          averageAssistance: averageAssistance.toFixed(1),
        });
      });
    
      this.arrayEventInfo=eventInfo
    },

    generateEventInfoPast() {

      const eventInfo = [];
      this.pastCategory.forEach((category) => {
        const eventsUp = this.pastEvents.filter((event) => event.category === category);
        let totalRevenue = 0;
        let totalAssistance = 0;
    
        eventsUp.forEach((event) => {
          totalRevenue += (event.assistance * event.price);
          totalAssistance += ((event.assistance / event.capacity) * 100);
        });
    
        const averageAssistance = totalAssistance / eventsUp.length;
    
        eventInfo.push({
          category: category,
          totalRevenue: totalRevenue.toLocaleString(),
          averageAssistance: averageAssistance.toFixed(1),
        });
      });
    
      this.arrayEventInfoPast=eventInfo
    }
    
  }

})
app.mount("#app")

