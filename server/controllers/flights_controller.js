const axios = require("axios");
const moment = require("moment");
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
        console.log(responseData);
        res.send(
          responseData.Quotes.filter(quote => {
            return quote.MinPrice <= budget;
          })
        );
      })
      .catch(err => res.send(err.response.data));
  },
  Get_Quote: (req, res, next)=>{
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
      axios
        .get(
          `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}/${inboundPartialDate ||
            ""}?apiKey=${key}`,
          { headers: { Accept: "application/json" } }
        )
        .then(response => {
          let quotes=response.data.Quotes;
          let carriers=response.data.Carriers;
          let places=response.data.Places;
          let currencies=response.data.Currencies;
          let responseArray = [];

          quotes.forEach(quote => {
            if (quote.OutboundLeg) {
              /* Add Carrier Names to object*/
              quote.OutboundLeg.Carrier = [];
              quote.OutboundLeg.CarrierIds.forEach(id => {
                let result = carriers.filter(carrier => carrier.CarrierId === id);
                quote.OutboundLeg.Carrier.push(result.Name);
              });
              /*Add Origin Code*/
              let OriginPlace = places.filter(place => place.PlaceId === quote.OutboundLeg.OriginId)[0];
              quote.OutboundLeg.OriginName = OriginPlace.Name;
              quote.OutboundLeg.OriginCode = OriginPlace.IataCode;
              /*Add Destination Code*/
              let DestinationPlace = places.filter(place => place.PlaceId === quote.OutboundLeg.DestinationId)[0];
              quote.OutboundLeg.DestinationName = DestinationPlace.Name;
              quote.OutboundLeg.DestinationCode = DestinationPlace.IataCode;
            }
            if (quote.InboundLeg) {
              /* Add Carrier Names to object*/
              quote.InboundLeg.Carrier = [];
              quote.InboundLeg.CarrierIds.forEach(id => {
                let result = carriers.filter(carrier => carrier.CarrierId === id);
                quote.InboundLeg.Carrier.push(result.Name);
              });
              /*Add Origin Code*/
              let OriginPlace = places.filter(place => place.PlaceId === quote.InboundLeg.OriginId)[0];
              quote.InboundLeg.OriginName = OriginPlace.Name;
              quote.InboundLeg.OriginCode = OriginPlace.IataCode;
              /*Add Destination Code*/
              let DestinationPlace = places.filter(place => place.PlaceId === quote.InboundLeg.DestinationId)[0];
              quote.InboundLeg.DestinationName = DestinationPlace.Name;
              quote.InboundLeg.DestinationCode = DestinationPlace.IataCode;
            }
          });

          /*filter quotes for budget*/
          quotes = quotes.filter(quote=>quote.MinPrice <= budget)
          console.log(quotes);
          res.status(200).send(quotes);
        })
        .catch(err => res.status(500).send(err.response.data));
  }
};
