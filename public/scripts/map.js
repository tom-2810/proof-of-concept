const schipholAirport = JSON.parse(schiphol);
const secondaryAirport = JSON.parse(otherAirport);


const schipholCoordinates = [schipholAirport.latitude, schipholAirport.longitude]
const secondaryCoordinates = [secondaryAirport.latitude, secondaryAirport.longitude]

var map = L.map('map').setView(secondaryCoordinates, 7);

var schipholMarker = L.marker(schipholCoordinates).addTo(map);
var secondaryMarker = L.marker(secondaryCoordinates).addTo(map);


secondaryMarker.bindPopup(`Bestemming: ${secondaryCoordinates.toString()}`).openPopup();

var myLines = [{
    "type": "LineString",
    "coordinates": [[secondaryAirport.longitude, secondaryAirport.latitude], [schipholAirport.longitude, schipholAirport.latitude]]
}];

L.geoJSON(myLines, {
    style: {
        "color": "var(--sds-pax-color-signal-50)",
        "weight": 4,
        "opacity": .9
    }
}).addTo(map);

googleHybrid = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);