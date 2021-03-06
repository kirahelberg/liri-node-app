var search = require("./search.js");
var moment = require("moment");
require("dotenv").config();
var fs = require("fs");

// Determines if we're searching for concert, spotify, movie
if (process.argv[2]) {
  var searchQuery = process.argv[2].toLowerCase();
}
var userSearch = "";
for (var i = 3; i < process.argv.length; i++) {
  userSearch += process.argv[i].trim() + "+";
}

//New variable to search BANDS IN TOWN API
var artistSearch = userSearch.slice(0, -1);
var movieSearch = userSearch.slice(0, -1);
var songSearch = userSearch.slice(0, -1);

//SEARCH FOR CONCERTS IN BANDS IN TOWN API
if (searchQuery === "concert-this") {
  search.getConcert(artistSearch).then(function(response) {
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

//SEARCH FOR SONG IN SPOTIFY
if (searchQuery === "spotify-this-song") {
  if (songSearch) {
    search
      .getSong(songSearch)
      .then(function(response) {
        console.log(response.tracks.items[0]);
        console.log("Artist: " + response.tracks.items[0].artists.name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log(
          "Click the link to preview the song: " +
            response.tracks.items[0].external_urls.spotify
        );
        console.log("\n---------------");
      })
      .catch(function(err) {
        console.log(err);
      });
  } else {
    search
      .getDefaultSong()
      .then(function(response) {
        console.log(response.tracks.items[0]);
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log(
          "Click the link to preview the song: " +
            response.tracks.items[0].external_urls.spotify
        );
        console.log("\n---------------");
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

//SEARCH FOR MOVIE ON OMDB
if (searchQuery === "movie-this") {
  if (movieSearch) {
    search.getMovie(movieSearch).then(function(response) {
      console.log("Movie title: " + response.data.Title);
      console.log("Release year: " + response.data.Year);
      console.log("IMDB rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
      console.log("Country where movie was produced: " + response.data.Country);
      console.log("Movie language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Plot: " + response.data.Actors);
      console.log("\n---------------");
    });
  } else {
    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );
    console.log("It's on Netflix!");
  }
}

//DO WHAT IT SAYS
if (searchQuery === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(err, data) {
    console.log(data);
  });
}
