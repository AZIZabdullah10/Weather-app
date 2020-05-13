const forcast = require('./src/utils/forcast')
const geolocation = require('./src/utils/geolocation')

const address = process.argv[2]

const getWeather = address => {
    if (!address) {
            console.log('Please provide us with an address.');
     } 
     else {
        geolocation.geoloaction(address, data => {
            forcast.forcast(data.latitude, data.longitude, forcastData => {
                console.log(data, forcastData);
                
            })
        })
    }
}


module.exports.getWeather = getWeather