var http = require("https");

var options = {
  "method": "GET",
  "hostname": "https://api.schiphol.nl/public-flights",
  "port": null,
  "path": "/flights",
  "headers": {
    "resourceversion": "v4",
	"app_id": "1822ff3f",
	"app_key": "3e9da2fd144c0ffaacc1bd575f4f39ab"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();