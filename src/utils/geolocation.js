const request = require("request")

const geoloaction = (address, callback) => {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWJkdWxsYWgxMCIsImEiOiJjazloMmxndHEwam5iM2RsaW91eWJ2NXE0In0.UUWtnlRWWawlQ2V6wEcUVg&limit=1`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback({
                error: 'No internet<br>Make sure you are connected to the internet.'
        })
        } else if (response.body.features.length === 0) {
            callback({error: 'Unable to find the location!Try another search.'})
        } else {
            callback({
                longitude: response.body.features[0].center[0],//.toFixed()),
                latitude: response.body.features[0].center[1],//.toFixed()),
                country: response.body.features[0].place_name,
            })
        };
    });
}

module.exports.geoloaction = geoloaction