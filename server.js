const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./src/utils/forcast')
const geolocation = require('./src/utils/geolocation')

const app = express()

// path for express config
const publicDir = path.join(__dirname, './public')
const viewApp = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// set up directry for server
app.use(express.static(publicDir))

// set up hbs
app.set('view engine', 'hbs')
app.set('views', viewApp)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Abdullah',
        title: 'Weather app!'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abdullah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abdullah',
        className: 'aboutH1'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term must be provided!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Must provide an address!'
        })
    } else {
        geolocation.geoloaction(req.query.address, data => {
            if (data.error) {
                return res.send({
                    error: data.error
                })
            } else {
                forcast.forcast(data.latitude, data.longitude, forcastData => {
                    return res.send({
                        geoData: data,
                        forcastData
                    })
                })
            }
        })
    }


})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errType: "404!",
        errMsg: "Help article not found!"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        errType: "404!",
        errMsg: "Page not found!"
    })
})



app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})