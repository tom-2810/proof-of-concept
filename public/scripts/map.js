let departureAirport = ''
let arrivalAirport = ''

const schipholAirportCoordinates = [52.3086, 4.76389]

var map = L.map('map').setView(schipholAirportCoordinates, 4);
var schipholAirportMarker = L.marker(schipholAirportCoordinates).addTo(map);
schipholAirportMarker.bindPopup(`Airport: Amsterdam Airport Schiphol. Coordinates: 52.3086, 4.76389`).openPopup();


if (departure && arrival) {
    map.removeLayer(schipholAirportMarker)
    departureAirport = JSON.parse(departure);
    arrivalAirport = JSON.parse(arrival);

    const departureAirportCoordinates = [departureAirport.latitude, departureAirport.longitude]
    const arrivalAirportCoordinates = [arrivalAirport.latitude, arrivalAirport.longitude]

    var departureAirportMarker = L.marker(departureAirportCoordinates).addTo(map);
    var arrivalAirportMarker = L.marker(arrivalAirportCoordinates).addTo(map);

    arrivalAirportMarker._icon.classList.add("arrivalAirportMarker");

    departureAirportMarker.bindPopup(`Airport: ${departureAirport.airport}. Coordinates: ${departureAirportCoordinates.toString()}`).openPopup();
    arrivalAirportMarker.bindPopup(`Airport: ${arrivalAirport.airport}. Coordinates: ${arrivalAirportCoordinates.toString()}`).openPopup();

    var myLines = [{
        "type": "LineString",
        "coordinates": [[arrivalAirport.longitude, arrivalAirport.latitude], [departureAirport.longitude, departureAirport.latitude]]
    }];

    L.geoJSON(myLines, {
        style: {
            "color": "var(--sds-pax-color-signal-50)",
            "weight": 2,
            "opacity": .8
        }
    }).addTo(map);
}


googleHybrid = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);