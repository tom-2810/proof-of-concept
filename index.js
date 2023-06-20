import express, { json, request, response } from 'express'
import { Server } from 'socket.io'
import { createServer, get } from 'http'

// IATA data over vlieghavens met hun coordinaten
import IATA from "./IATA.js";



const schiphol_api = 'https://api.wheretheiss.at/v1/satellites/25544'






const departureAirport = IATA.filter(obj => {
  return obj.iata === "AMS"
});

const arrivalAirport = IATA.filter(obj => {
  return obj.iata === "AGP"
});

const coordinates = {
  departureAirport: departureAirport[0],
  arrivalAirport: arrivalAirport[0]
}

// Maak een nieuwe express app
const app = express()
const http = createServer(app)
const ioServer = new Server(http)
const port = process.env.PORT || 8000

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

// function updateFlights() {
//   // Verstuur het bericht naar alle clients
//   ioServer.emit('update-flights', { flightsData: " terug" })
// }

// updateFlights()

// setInterval(updateFlights, 2000)

async function getFlights() {
  const responseFlights = await fetch(schiphol_api)
  const data = await responseFlights.json()

  ioServer.emit('update-flights', { data })
}

getFlights()

setInterval(getFlights, 5000)

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})