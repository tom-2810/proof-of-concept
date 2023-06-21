let ioServer = io()
let arrivingFligtsList = document.querySelector('#arrivingflights')
let departingFligtsList = document.querySelector('#arrivingflights')
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

            addFlightCard(arrivingFligtsList, flight)

        }




    })

}

function addFlightCard(flightDirectionList, flight) {
    flightDirectionList.insertAdjacentHTML('beforeend',
    `
    <li class="flight" data-flightNumber="${flight.flightNumber}">
        <a href="?departureAirportIATA=AMS&arrivalAirportIATA=${flight.route.destinations[0]}"></a>
        <div class="content">
            <div>
            <p class="status">${flight.flightDirection}</p>

            <section class="information">
                <h3>${flight.flightName}</h3>
                <p>11:20, 10 June</p>
                <p>EJU 7839 easyJet Europe</p>
            </section>

                <a href="#meer">> meer</a>
            </div>
            <div class="options">
                <!-- <div class="flag">flag</div> -->
                <div class="enter">-></div>
            </div>
        </div>
    </li>
`
)
flightsListContainments.push(flight.flightNumber)
console.log(flightsListContainments)
}