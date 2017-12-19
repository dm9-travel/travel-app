const axios = require("axios");
require("dotenv").config();

//Google Places Key
const PlacesKey = process.env.GOOGLEPLACESKEY;

module.exports = {
  getAirports: (req, res, next)=>{

    axios
      .get(
        // `https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=${latitude},${longitude}&radius=10000&key=${PlacesKey}`
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&types=airport&key=${PlacesKey}`
      )
      .then();
  }
};
