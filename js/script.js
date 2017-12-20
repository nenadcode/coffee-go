const body = document.querySelector('body'),
  wrapper = document.querySelector('#wrapper')

// HTML5 Geolocation

let getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

getPosition()
  .then((position) => {
    let lat = position.coords.latitude,
        lng = position.coords.longitude

    let venuesSearchUrl = `${window.config.foursquareApi}?`

    venuesSearchUrl = window.config.foursquareApiSearch + "?categoryId=" + window.config.foursquareCategoryId + "&v=20131016&ll=" + lat + "," + lng + "&radius=" + window.config.foursquareRadius + "&client_id=" + window.config.foursquareClientId + "&client_secret=" + window.config.foursquareClientSecret + "&v=" + window.config.foursquareApiVersion

    // API call - Place name, img, foursquare rating, address, will the coffee get cold
    fetch(venuesSearchUrl)
      .then((resp) => resp.json())
      .then(function(data) {
        let places = data.response.venues

        // return places.map(place => getPlaceTemplate(place))
        //  .forEach(placeDom => {
        //    append(placeDOM)
        //  })

        return places.map(function(place) {
          let cardNode = DOM.createNode('div'),
              photoContainerNode = DOM.createNode('div'),
              infoContainerNode = DOM.createNode('div'),
              nameRatingContainerNode = DOM.createNode('div'),
              ratingContainerNode = DOM.createNode('div'),
              nameNode = DOM.createNode('h1'),
              ratingsNode = DOM.createNode('p'),
              addressNode = DOM.createNode('p'),
              coffeeColdNode = DOM.createNode('p'),

              idValue = place.id
              nameValue = place.name,
              addressValue = place.location.address, place.location.city

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

          fetch(foursquareApiVenue + idValue + '/?client_id=' + foursquareClientId + '&client_secret=' + foursquareClientSecret + '&v=' + foursquareApiVersion + ')
            .then((resp) => resp.json())
            .then(function (data) {
              let ratings = data.response.venue.rating,
                venueHasPhoto = data.response.venue.hasOwnProperty('bestPhoto'),
                photo = data.response.venue.bestPhoto,
                imgNode = DOM.createNode('img'),
                imgSrcValue = (venueHasPhoto) ? photo.prefix + '100x100' + photo.suffix : '../img/no-image.jpg'

              imgNode.src = imgSrcValue

              append(photoContainerNode, imgNode)

              ratingsNode.innerHTML = (ratings) ? ratings : '-'

              return ratings

            })
        })
      })
  })
  .catch((err) => {
    let errorNode = createNode('p'),
        errorSpanNode = createNode('span')

    errorNode.className = 'error'

    errorNode.innerHTML = 'Do you want to see where are closest Coffee Shops?'
    errorSpanNode.innerHTML = 'Please allow Coffee Go to see your location.'

    append(errorNode, errorSpanNode)
    append(wrapper, errorNode)
  })

// END




