function initMap(){

  const ubication = new Location(()=>{

    const options ={
      loc:{
        lat:ubication.latitude,
        lng:ubication.longitude
      },
      zoom:12
    }
    let map=document.getElementById('map')

    const mapa= new google.map.Map(map,options)
  })
}