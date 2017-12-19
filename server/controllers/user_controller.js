const axios = require("axios");

module.exports = {
  Get_Flights: (req, res, next) => {
    const {
      country,
      currency,
      locale,
      originPlace,
      destinationPlace,
      outboundPartialDate,
      inboundPartialDate,
      key
    } = req.body;
    //http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=dallas&apiKey=so915963205287245322146323136295
    //http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/DFW/Anywhere/2018-03-03/?apiKey=so915963205287245322146323136295
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
