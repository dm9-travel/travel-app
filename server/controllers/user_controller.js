const axios = require("axios");
require("dotenv").config();

const key = process.env.KEY;

module.exports = {
  Get_Flights: (req, res, next) => {
    const {
      country,
      currency,
      locale,
      originPlace,
      destinationPlace,
      outboundPartialDate,
      inboundPartialDate
    } = req.body;

    //http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/DFW/Anywhere/2018-03-03/?apiKey={key}
    axios
      .get(
        `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}
                /${originPlace}/${destinationPlace}/${outboundPartailDate}/${inboundPartialDate}?apiKey=${key}`,
        { headers: { Accept: "application/json" } }
      )
      .then(response => {
        return response.data;
      })
      .catch(err => err);
  },

  Get_Watchlist: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .Get_Watchlist(params.id)
      .then(list => {
        res.status(200).send(list);
      })
      .catch(err => err);
  }
};
