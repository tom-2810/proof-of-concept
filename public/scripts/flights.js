let ioServer = io()

// Luister naar berichten van de server
ioServer.on('update-flights', (flights) => {
    updateFlights(flights)
})

function updateFlights(flights) {
    console.log(flights.data)
}