const schipholAirport = JSON.parse(schiphol);
const secondaryAirport = ""


const schipholCoordinates = [schipholAirport.latitude, schipholAirport.longitude]
const secondaryCoordinates = [51.470020, -0.454295]

var map = L.map('map').setView(secondaryCoordinates, 7);

var schipholMarker = L.marker(schipholCoordinates).addTo(map);
var secondaryMarker = L.marker(secondaryCoordinates).addTo(map);


secondaryMarker.bindPopup(`Bestemming: ${secondaryCoordinates.toString()}`).openPopup();

var myLines = [{
    "type": "LineString",
    "coordinates": [[4.764167, 52.308056], [-0.454295, 51.470020]]
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