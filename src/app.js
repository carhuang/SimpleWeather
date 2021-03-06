const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Carly Huang'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }
    
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecast: data,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serach term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Carly Huang'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Carly Huang',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Carly Huang',
        errorMsg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('App started on port ' + port)
})