window.venueApi = (function () {
  function getVenuesSearchUrl() {
    return `${window.config.foursquareApiSearch}`
  }

  function getVenueUrl () {
    return `${ window.config.foursquareApiVenue }`
  }

  function getVenuesSearch() {
    let venueSearch = getVenuesSearchUrl() + '?categoryId=' + window.config.foursquareCategoryId + '&v=20131016&ll=' + lat + ',' + lng + '&radius=' + window.config.foursquareRadius + '&client_id=' + window.config.foursquareClientId + '&client_secret=' + window.config.foursquareClientSecret + '&v=' + window.config.foursquareApiVersion

    return fetch(venueSearch)
      .then((resp) => resp.json())
  }

  function getVenue (id) {
    let venueUrl = getVenueUrl(id) + '/?client_id=' + window.config.foursquareClientId + '&client_secret=' + window.config.foursquareClientSecret + '&v=' + window.config.foursquareApiVersion

    return fetch(venueUrl)
      .then((resp) => resp.json())
  }

  return {
    getVenuesSearch,
    getVenue
  }
})()