exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var axios = require("axios");
var moment = require("moment");

function getConcert(userSearch) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    userSearch +
    "/events?app_id=codingbootcamp";
  return axios.get(queryURL);
}

module.exports = {
  getConcert: getConcert
};
