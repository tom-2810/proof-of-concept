import express, { json, request, response } from 'express'
import { Server } from 'socket.io'
import { createServer, get } from 'http'

import { fetchJson, postJson } from './helpers/fetchWrapper.js'

// IATA data over vlieghavens met hun coordinaten
import IATA from "./IATA.js";



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
  let { departureAirportIATA } = request.query
  let { arrivalAirportIATA } = request.query

  const departureAirport = IATA.filter(obj => {
    return obj.iata === departureAirportIATA
  });

  const arrivalAirport = IATA.filter(obj => {
    return obj.iata === arrivalAirportIATA
  });

  const coordinates = {
    departureAirport: departureAirport[0],
    arrivalAirport: arrivalAirport[0]
  }

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




const schipholAPI = await fetch("https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime&flightDirection=A", {
  mode: 'cors',
  headers: {
    "Accept": "application/json",
    "resourceversion": "v4",
    "app_id": "1822ff3f",
    "app_key": "3e9da2fd144c0ffaacc1bd575f4f39ab",
  }
});

const schipholAPIData = await schipholAPI.json();
const slicedFlightsData = schipholAPIData.flights.slice(0, 20);
console.log(slicedFlightsData[0].route.destinations[0])

ioServer.on('connection', () => {
  console.log("connecting")
  getFlights()
})

// Update vluchtgegevens naar alle clients met een terugkerende interval
async function getFlights() {
  ioServer.emit('update-flight', { data: slicedFlightsData })
}

getFlights()

setInterval(getFlights, 5000)

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})