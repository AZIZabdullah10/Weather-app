const https = require('https')

const url = "https://api.openweathermap.org/data/2.5/weather?lat=24&lon=90&appid=f6ee9e6c00eaaef7a47adaed08d39b2e"

const request = https.request(url, response => {
    let data =''
    response.on('data', chunk => {
        data += chunk
    })
    response.on('end' , () =>{
        console.log(JSON.parse(data))
    })
});

request.on('error', error => {
    console.log('An error occurd');
    
})

request.end();