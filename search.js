var fs = require("fs");
require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function getConcert(userSearch) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    userSearch +
    "/events?app_id=codingbootcamp";
  return axios.get(queryURL);
}

function getSong() {
  spotify
    .request(
      "https://api.spotify.com/v1/search?q=" +
        "bohemian+rhapsody" +
        "&type=track"
    )
    .then(function(response) {
      console.log(response);
    });
}

function getMovie(userSearch) {
  var movieUrl =
    "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
  return axios.get(movieUrl);
}

getSong();

module.exports = {
  getConcert: getConcert,
  getMovie: getMovie
  //getSong: getSong
};
