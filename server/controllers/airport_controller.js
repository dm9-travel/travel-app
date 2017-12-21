const axios = require("axios");
require("dotenv").config();

//Sky Scanner Key
const skyScannerKey = process.env.KEY;

  

http: module.exports = {
  Get_Airport: (req, res, next) => {
    let latitude = req.query.lat;
    let longitude = req.query.long;

    axios
      .get(
        `http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?id=${latitude},${longitude}-latlong&apiKey=${skyScannerKey}`
      )
      .then(airport => {
        res.status(200).send(airport.data.Places[0]);
      })
      .catch(() => console.log);
  }
};
