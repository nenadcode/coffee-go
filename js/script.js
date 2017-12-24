const wrapper = document.getElementById('wrapper')

// Creating HTML elements

function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

// END

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
      venuesSearchUrl = 'https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1e0931735&v=20131016&ll=' + lat + ',' + lng + '&radius=1000&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609'

    // API call - Place name, img, foursquare rating, address, will the coffee get cold
    fetch(venuesSearchUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let places = data.response.venues

        return places.map(function (place) {
          let cardNode = createNode('div'),
            photoContainerNode = createNode('div'),
            infoContainerNode = createNode('div'),
            nameRatingContainerNode = createNode('div'),
            ratingContainerNode = createNode('div'),
            nameNode = createNode('h1'),
            ratingsNode = createNode('p'),
            addressNode = createNode('p'),
            coffeeColdNode = createNode('p'),

            idValue = place.id,
            nameValue = place.name,
            addressValue = place.location.address + ' ' +  place.location.city

          cardNode.className = "card"
          photoContainerNode.className = 'card__photo-container'
          infoContainerNode.className = 'card__info-container'
          nameRatingContainerNode.className = 'card__info-container__name-rating-container'
          ratingContainerNode.className = 'card__info-container__rating-container'
          addressNode.className = 'card__info-container__address'
          coffeeColdNode.className = 'card__info-container__coffee-cold'

          nameNode.innerHTML = (nameValue) ? nameValue : '-'
          addressNode.innerHTML = (addressValue) ? addressValue : 'Sorry, no address found for this venue.'

          if (place.location.distance <= 1000) {
            coffeeColdNode.className += ' success'
            coffeeColdNode.innerHTML = 'Coffee will stay warm. Go get it!'
          } else if (place.location.distance > 1000) {
            coffeeColdNode.className += ' warning'
            coffeeColdNode.innerHTML = 'Coffee will get cold, try some other coffee shop.'
          } else {
            coffeeColdNode.innerHTML = 'Sorry, not able to locate distance from your location.'
          }

          append(nameRatingContainerNode, nameNode),
          append(nameRatingContainerNode, ratingContainerNode),
          append(ratingContainerNode, ratingsNode),
          append(infoContainerNode, nameRatingContainerNode),
          append(infoContainerNode, addressNode),
          append(infoContainerNode, coffeeColdNode),
          append(cardNode, photoContainerNode),
          append(cardNode, infoContainerNode),
          append(wrapper, cardNode)

          fetch('https://api.foursquare.com/v2/venues/' + idValue + '/?client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
            .then((resp) => resp.json())
            .then(function (data) {
              let ratings = data.response.venue.rating,
                venueHasPhoto = data.response.venue.hasOwnProperty('bestPhoto'),
                photo = data.response.venue.bestPhoto,
                imgNode = createNode('img'),
                imgSrcValue = (venueHasPhoto) ? photo.prefix + '100x100' + photo.suffix : '../img/no-image.jpg'

              imgNode.src = imgSrcValue

              append(photoContainerNode, imgNode)

              ratingsNode.innerHTML = (ratings) ? ratings : '-'

              return ratings

            })
        })
      })
  })
  .catch(() => {
    let errorNode = createNode('p'),
      errorSpanNode = createNode('span')

    errorNode.className = 'error'

    errorNode.innerHTML = 'Do you want to see where are closest Coffee Shops?'
    errorSpanNode.innerHTML = 'Please allow Coffee Go to see your location.'

    append(errorNode, errorSpanNode)
    append(wrapper, errorNode)
  })

// END




