let ioServer = io()
let arrivingFlightsList = document.querySelector('#arrivingflights')
let departingFlightsList = document.querySelector('#arrivingflights')
let allFlights = document.querySelectorAll('.flight')
let flightsListContainments = []
// allFlights.forEach(flight => flightsListContainments.push(flight.getAttribute('data-flightNumber')))

console.log(flightsListContainments)


// Luister naar berichten van de server
ioServer.on('update-flight', (flights) => {
    updateFlights(flights)
})

function updateFlights(flights) {

    flights.data.forEach(flight => {


        if (!flightsListContainments.includes(flight.flightNumber)) {

            addFlightCard(arrivingFlightsList, flight)

        }




    })

}

function addFlightCard(flightDirectionList, flight) {
    flightDirectionList.insertAdjacentHTML('beforeend',
    `
    <li class="flight" data-destinations="${flight.route.destinations[0]} data-flightNumber="${flight.flightNumber}">
        <a href="?departureAirportIATA=AMS&arrivalAirportIATA=${flight.route.destinations[0]}"></a>
        <div class="content">
            <div>
            <p class="status">${flight.publicFlightState.flightStates[0]}</p>

            <section class="information">
                <h3>${flight.route.destinations[0]}</h3>
                <p>${flight.scheduleTime}, ${flight.scheduleDate}</p>
                <p>${flight.flightName} ${flight.prefixICAO}</p>
            </section>

                <a href="#meer">> meer</a>
            </div>
            <div class="options">
                <div class="enter">-></div>
            </div>
        </div>
    </li>
`
)
flightsListContainments.push(flight.flightNumber)
console.log(flight)
}