const request = require('request')

function forecast(lat, long, callback) {
    const url = 'https://api.darksky.net/forecast/4f66f9e5d999ab41ffd50ad45b0e2766/' + lat + ',' + long
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const current = body.currently
            const currentTemp = current.temperature
            const currentRain = current.precipProbability * 100
            callback(undefined, body.daily.data[0].summary + '<br />It is currently ' + currentTemp + ' degrees out. There is a ' + currentRain + '% chance of rain.')
        }
    })
}

module.exports = forecast