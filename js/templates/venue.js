window.venueTemplate = (function () {
  function createVenueItem(place) {
    let cardNode = DOM.createNode('div'),
      photoContainerNode = DOM.createNode('div'),
      infoContainerNode = DOM.createNode('div'),
      nameRatingContainerNode = DOM.createNode('div'),
      ratingContainerNode = DOM.createNode('div'),
      nameNode = DOM.createNode('h1'),
      ratingsNode = DOM.createNode('p'),
      addressNode = DOM.createNode('p'),
      coffeeColdNode = DOM.createNode('p'),

      nameValue = place.name,
      addressValue = place.location.address + ' ' + place.location.city

    cardNode.className = 'card'
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

    DOM.append(nameRatingContainerNode, nameNode)
    DOM.append(nameRatingContainerNode, ratingContainerNode)
    DOM.append(ratingContainerNode, ratingsNode)
    DOM.append(infoContainerNode, nameRatingContainerNode)
    DOM.append(infoContainerNode, addressNode)
    DOM.append(infoContainerNode, coffeeColdNode)
    DOM.append(cardNode, photoContainerNode)
    DOM.append(cardNode, infoContainerNode)

    return cardNode
  }

  function addAdditionalDataToVenue(place, venueDom) {
    return venueApi.getVenue(place.id)
      .then(function (data) {
        let ratings = data.response.venue.rating,
          venueHasPhoto = data.response.venue.hasOwnProperty('bestPhoto'),
          photo = data.response.venue.bestPhoto,
          imgNode = DOM.createNode('img'),
          imgSrcValue = (venueHasPhoto) ? photo.prefix + '100x100' + photo.suffix : '../img/no-image.jpg'

        imgNode.src = imgSrcValue

        let photoContainerNode = venueDom.querySelector('.card__photo-container')

        DOM.append(photoContainerNode, imgNode)

        let ratingsNode = venueDom.querySelector('.card__info-container__rating-container > p')

        ratingsNode.innerHTML = (ratings) ? ratings : '-'

      })
  }

  return {
    createVenueItem,
    addAdditionalDataToVenue
  }
})()
