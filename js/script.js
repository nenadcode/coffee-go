const wrapper = document.querySelector('#wrapper')

// HTML5 Geolocation

let getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

getPosition()
  .then((position) => {
    let lat = position.coords.latitude,
      lng = position.coords.longitude

    // API call - Place name, img, foursquare rating, address, will the coffee get cold
    venueApi.getVenuesSearch(lat, lng)
      .then(function (data) {
        let places = data.response.venues

        return places
          .map(place => ({
            placeDom: venueTemplate.createVenueItem(place),
            place
          }))
          .forEach(({ placeDom, place }) => {
            DOM.append(wrapper, placeDom)
            venueTemplate.addAdditionalDataToVenue(place, placeDom)
          })
      })
  })
  .catch(() => {
    let errorNode = DOM.createNode('p'),
      errorSpanNode = DOM.createNode('span')

    errorNode.className = 'error'

    errorNode.innerHTML = 'Do you want to see where are closest Coffee Shops?'
    errorSpanNode.innerHTML = 'Please allow Coffee Go to see your location.'

    DOM.append(errorNode, errorSpanNode)
    DOM.append(wrapper, errorNode)
  })

// END
