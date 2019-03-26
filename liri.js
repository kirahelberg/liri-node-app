//require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
//var spotify = new Spotify(keys.spotify);

// Determines if we're searching for concert, spotify, movie
if (process.argv[2]) {
  var searchQuery = process.argv[2].toLowerCase();
  var userSearch = "";
  for (var i = 3; i < process.argv.length; i++) {
    userSearch += process.argv[i].trim() + "+";
  }
  var artistSearch = userSearch.slice(0, -1);
}

if (searchQuery === "concert-this") {
  keys.getConcert(artistSearch).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("Venue name: " + response.data[i].venue.name);
      console.log(
        "Venue location: " +
          response.data[i].venue.city +
          ", " +
          response.data[i].venue.country
      );
      var eventDate = response.data[i].datetime;
      var dateFormat = "YYYY-MM-DD";
      var trimmedDate = eventDate.substring(0, 10);
      var momentDate = moment(trimmedDate, dateFormat);
      console.log("Date of event: " + momentDate.format("MM/DD/YY"));
      console.log("\n---------------");
    }
  });
}

// var searchName = "";
// for (var i = 3; i < process.argv.length; i++) {
//   searchName += process.argv[i].trim() + "+";
// }
