const request = require('request')

function geocode(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYzg1NjE1IiwiYSI6ImNrM3Vqd2ZxMjBlaDEzc3Fyd2I3Z3FqOWMifQ.eXm1V-iDHkwyvh5Ye3NeVQ&limit=1'

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode