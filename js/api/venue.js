window.venueApi = (function () {
  function getVenueUrl () {
    return `${ window.config.foursquareApi }?`
  }

  function getVenue (id) {
    let venuesSearchUrl = getVenueUrl(id)
    return fetch(venuesSearchUrl)
      .then((resp) => resp.json())
  }

  return {
    getVenue
  }
})()