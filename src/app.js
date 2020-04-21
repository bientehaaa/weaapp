const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
  res.render('index', {
    title: 'Weather',
    name: 'Alireza Kazemzadeh'
  })
})

app.get('/about', (req, res)=> {
  res.render('about', {
    title: 'ABOUT PAGE',
    name: 'ALIREZA KAZEMZADEH'
  })
})

app.get('/help', (req, res)=> {
  res.render('help', {
    title: 'HELP PAGE',
    name: 'ALIREZA KAZEMZADEH'
  })
})

app.get('/weather', (req, res)=> {
  if(!req.query.address){
    res.send({
      error: 'Please provide the address'
    })
  }

  geocode(req.query.address, (error, {latitude, longtitude, location}={})=> {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longtitude, (error, forecatData)=> {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecatData,
        location,
        address: req.query.address
      })
    })

  })
  // res.send({
  //   forecast: 'It is cloudy',
  //   location: 'Mashhad',
  //   address: geocode.location
  // })
})

app.get('/product', (req, res)=> {

  if(!req.query.search) {
    return res.send({
      error: 'Please provide the search term'
    })
  } 
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res)=> {
  res.render('404', {
    title: '404',
    name: 'Hasti Nikoonam',
    errorMessage: ' Help Article not found at the moment'
  })
})

app.get('*', (req, res)=> {
  res.render('404', {
    title: '404',
    name: 'Hasti Nikoonam',
    errorMessage: 'Page Not found'
  })
})

app.listen(port, ()=> {
  console.log('Server is Up now!' + port)
})