const body = document.getElementsByTagName('body'),
      wrapper = document.getElementById('wrapper'),
  venuesSearchUrl ='https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1e0931735&v=20131016&ll=44.792455499999996,20.4915168&radius=1000&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609'


// HTML5 Geolocation

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    body.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  body.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
    body.innerHTML = "User denied the request for Geolocation."
    break;
    case error.POSITION_UNAVAILABLE:
    body.innerHTML = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    body.innerHTML = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    body.innerHTML = "An unknown error occurred."
    break;
  }
}
// END

// Creating HTML elements

function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}
// END

// API call - Place name, img, foursquare rating, address, will the coffee get cold
fetch(venuesSearchUrl)
  .then((resp) => resp.json())
  .then(function(data) {
    let places = data.response.venues

    return places.map(function(place) {
      let card = createNode('div'),
          photoContainer = createNode('div'),
          infoContainer = createNode('div'),
          name = createNode('h1'),
          address = createNode('p'),
          rating = createNode('p'),
          coffeeCold = createNode('p'),
          span = createNode('span')

          idValue = place.id
          nameValue = place.name,
          addressValue = place.location.address, place.location.city

      card.className = "card"
      photoContainer.className = 'photo-container'
      infoContainer.className = 'info-container'
      address.className = 'info-container__address'
      name.innerHTML = (nameValue) ? nameValue : '-',
      address.innerHTML = (addressValue) ? addressValue : '-',
      rating.innerHTML = 'Rating: ',
      coffeeCold.innerHTML = 'Will the coffee get cold?'

      append(infoContainer, name),
      append(infoContainer, address),
      append(infoContainer, rating),
      append(infoContainer, coffeeCold),
      append(card, photoContainer),
      append(card, infoContainer),
      append(wrapper, card)
      console.log(card)
      //console.log(img.src)
      console.log(name)
      console.log(address)

      fetch('https://api.foursquare.com/v2/venues/' + idValue + '/photos?limit=1&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
        .then((resp) => resp.json())
        .then(function(data) {
          let photos = data.response.photos.items

          return photos.map(function(photo) {
            let img = createNode('img')

            img.src = photo.prefix + '100x100' + photo.suffix

            append(photoContainer, img)
          })
        })
    })
  })
