const body = document.getElementsByTagName('body'),
      wrapper = document.getElementById('wrapper')

// Creating HTML elements

function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

// END


// Latitude and Longitude 44.792455499999996, 20.4915168

// HTML5 Geolocation

let getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

getPosition()
  .then((position) => {
    let lat = position.coords.latitude,
        lng = position.coords.longitude,
        venuesSearchUrl = "https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1e0931735&v=20131016&ll=" + lat + "," + lng + "&radius=1000&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609"

    // API call - Place name, img, foursquare rating, address, will the coffee get cold
    fetch(venuesSearchUrl)
      .then((resp) => resp.json())
      .then(function(data) {
        let places = data.response.venues

        return places.map(function(place) {
          let cardNode = createNode('div'),
              photoContainerNode = createNode('div'),
              infoContainerNode = createNode('div'),
              nameNode = createNode('h1'),
              addressNode = createNode('p'),
              ratingNode = createNode('p'),
              ratingsSpanNode = createNode('span'),
              coffeeColdNode = createNode('p'),
              coffeeColdSpanNode = createNode('span'),

              idValue = place.id
              nameValue = place.name,
              addressValue = place.location.address, place.location.city,
              coffeeColdSpanValue = place.location.distance,

          cardNode.className = "card"
          photoContainerNode.className = 'photo-container'
          infoContainerNode.className = 'info-container'
          addressNode.className = 'info-container__address'

          nameNode.innerHTML = (nameValue) ? nameValue : '-',
          addressNode.innerHTML = (addressValue) ? addressValue : 'Sorry, no address found for this venue.',
          ratingNode.innerHTML = 'Rating: '
          coffeeColdNode.innerHTML = 'Will the coffee get cold?'
          coffeeColdSpanNode.innerHTML = (place.location.distance <= 1000) ? ' No! Go get it!' : (place.location.distance > 1000) ? ' Yes, try some other coffee shop.' : 'Sorry, not able to locate distance from your location.'

          append(infoContainerNode, nameNode),
          append(infoContainerNode, addressNode),
          append(infoContainerNode, ratingNode)
          append(infoContainerNode, coffeeColdNode),
          append(cardNode, photoContainerNode),
          append(cardNode, infoContainerNode),
          append(ratingNode, ratingsSpanNode),
          append(coffeeColdNode, coffeeColdSpanNode),
          append(wrapper, cardNode)

          fetch('https://api.foursquare.com/v2/venues/' + idValue + '/photos?limit=1&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
            .then((resp) => resp.json())
            .then(function(data) {
              let photos = data.response.photos.items

              return photos.map(function(photo) {
                let imgNode = createNode('img')
                    imgSrcValue = photo.prefix + '100x100' + photo.suffix

                imgNode.src = (imgSrcValue) ? imgSrcValue : '../img/no-image.jpg'

                append(photoContainerNode, imgNode)
              })
            })

          fetch('https://api.foursquare.com/v2/venues/' + idValue + '/?client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
            .then((resp) => resp.json())
            .then(function(data) {
              let ratings = data.response.venue.rating
              ratingsSpanNode.innerHTML = (ratings) ? ratings : '-'

              return ratings
            })
        })
      })
  })
  .catch((err) => {
    console.error(err.message);
  });


// END




