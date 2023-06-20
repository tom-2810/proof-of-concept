import express, { json, request, response } from 'express'

import IATA from "./IATA.js";

const departureAirport = IATA.filter(obj => {
  return obj.iata === "AMS"
});

const arrivalAirport = IATA.filter(obj => {
  return obj.iata === "AYM"
});

// Maak een nieuwe express app
const app = express()

const coordinates = {
  departureAirport: departureAirport[0],
  arrivalAirport: arrivalAirport[0]
}

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Stel afhandeling van formulieren in
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Maak een route voor de index
app.get('/', (request, response) => {
  response.render('pages/index', { active: '/', coordinates: coordinates })
})

// Maak een route voor de list
app.get('/list', (request, response) => {
  response.render('pages/list-page', { active: '/list' })
})

// Maak een route voor de map
app.get('/map', (request, response) => {
  response.render('pages/map-page', { active: '/map' })
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})