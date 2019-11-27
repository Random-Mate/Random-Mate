function getAllPlacesFromTheAPI(geocoder,myMap) {
  axios.get("/places/api")
    .then(plan => placeLocation(plan.data.plans,geocoder, myMap))
    .catch(error => console.log(error))
}

function placeLocation(plan, myMap) {

  plan.forEach(elm => {

    const center = {
      lat: elm.location.coordinates[1],
      lng: elm.location.coordinates[0]
    }

    new google.maps.Marker({
      position: center,
      map: myMap,
      title: elm.name
    });

  })
}


x

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

    
      getAllPlacesFromTheAPI(geocoder, map);
    
  })
}

function geocodeAddress(plan,geocoder, resultsMap) {
  let address = plan
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