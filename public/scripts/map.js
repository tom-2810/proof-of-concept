const schipholCoordinates = [52.308056, 4.764167]
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

googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);