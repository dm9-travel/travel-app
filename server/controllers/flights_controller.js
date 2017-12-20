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
      inboundPartialDate,
      budget
    } = req.body;

    //http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/DFW/Anywhere/2018-03-03/?apiKey={key}
    console.log("hello");

    axios
      .get(
        `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}/${inboundPartialDate ||
          ""}?apiKey=${key}`,
        { headers: { Accept: "application/json" } }
      )
      .then(response => {
        console.log(response.data);
        let responseData = response.data;
        function matchDestination(quote) {
          let destination = responseData.Places.filter(place => {
            return place.PlaceId === quote.OutboundLeg.DestinationId;
          })[0];
          quote.destinationObj = destination;
        }
        function matchCarrier(quote) {
          let carrier = responseData.Carriers.filter(carrier => {
            return carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
          })[0];
          quote.carrierObj = carrier;
        }
        for (var i = 0; i < responseData.Quotes.length; i++) {
          matchDestination(responseData.Quotes[i]);
          matchCarrier(responseData.Quotes[i]);
        }
        res.send(
          responseData.Quotes.filter(quote => {
            return quote.MinPrice <= budget;
          })
        );
      })
      .catch(err => res.send(err.response.data));
  }
};
