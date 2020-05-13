const request = require('request')

const forcast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f6ee9e6c00eaaef7a47adaed08d39b2e`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback({ error: "Unable to connect to the servise! Make sure you are connected with internet." })
        }
        else if (response.body.cod == 400) {
            callback({
                error: 'No internet<br>Make sure you are connected to the internet.'
            })
        }
        else {
            callback({
                temperature: (response.body.main.temp - 273.5).toFixed(),
                placeName: response.body.name,
                country: response.body.sys.country,
                description: response.body.weather[0].description,
                pressure: response.body.main.pressure + ' hpa',
                humidity: response.body.main.humidity + '%',
                windSpeed: response.body.wind.speed + ' m/s'
            })
        }
    })
}

module.exports.forcast = forcast