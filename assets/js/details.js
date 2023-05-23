const { createApp } = Vue

const app = createApp({

  data() {

    return {
      arrayEvents: [],
      eventId: null,
      event: {}

    }
  },

  created() {

    const url = (`https://mindhub-xj03.onrender.com/api/amazing`)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.arrayEvents = data.events
        const params = new URLSearchParams(document.location.search)
        this.eventId = params.get('id')
        this.event = this.arrayEvents.find(event => event._id == this.eventId)
        console.log(this.event);


      })
      .catch(error => console.log(error))

  },

})
app.mount("#app")

