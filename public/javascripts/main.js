// function initMap(){
  
//     navigator.geolocation.getCurrentPosition((position) => {
//           this.latitude = position.coords.latitude
//           this.longitude = position.coords.longitude
    
//   const myMap = new google.maps.Map(document.getElementById("map"),
//   {
//     zoom: 12,
//       center:{
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       }
//     }
//   )
//     })

// }
// function getAllPlacesFromTheAPI(myMap) {
//   axios.get("/places/api")
//     .then(place => placeLocation(place.data.places, myMap))
//     .catch(error => console.log(error))
// }

// function placeLocation(place, myMap) {

//   place.forEach(elm => {

//     const center = {
//       lat: elm.location.coordinates[1],
//       lng: elm.location.coordinates[0]
//     }

//     new google.maps.Marker({
//       position: center,
//       map: myMap,
//       title: elm.name
//     });

//   })
// }


// function initMap() {

//   const myMap = new google.maps.Map(document.getElementById('map'), {
//     zoom: 2,
//     center: {
//       lat: 41.3977381,
//       lng: 2.190471916
//     }
//   })

//   getAllPlacesFromTheAPI(myMap)
// }

function initMap() {
  navigator.geolocation.getCurrentPosition((position) => {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  });
  let geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function () {
    geocodeAddress(geocoder, map);
  });
})
}

function geocodeAddress(geocoder, resultsMap) {
  let address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}