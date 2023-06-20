const departureAirport = JSON.parse(departure);
const arrivalAirport = JSON.parse(arrival);


const departureAirportCoordinates = [departureAirport.latitude, departureAirport.longitude]
const arrivalAirportCoordinates = [arrivalAirport.latitude, arrivalAirport.longitude]

var map = L.map('map').setView(arrivalAirportCoordinates, 5);

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

googleHybrid = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);