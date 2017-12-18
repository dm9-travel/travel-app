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
    axios
      .get(
        `http://partners.api.skyscanner.net/apiservices/browsquotes/v1.0/${country}/${currency}/${locale}
                /${originPlace}/${destinationPlace}/${outboundPartailDate}/${inboundPartialDate}?apiKey=${key}`
      )
      .then(response => {
        return response.data;
      });
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
