const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const key = process.env.KEY;
const pixKey = process.env.PIXABAYKEY;

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

    axios
      .get(
        `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}/${inboundPartialDate ||
          ""}?apiKey=${key}`,
        { headers: { Accept: "application/json" } }
      )
      .then(response => {
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
              let quotes = response.data.Quotes;
              let carriers = response.data.Carriers;
              let places = response.data.Places;
              let currencies = response.data.Currencies;
              let responseArray = [];
              
              quotes.forEach(quote => {
                if (quote.OutboundLeg) {
                  /* Add Carrier Names to object*/
                  quote.OutboundLeg.Carrier = [];
                  quote.OutboundLeg.CarrierIds.forEach(id => {
                    let result = carriers.filter(
                      carrier => carrier.CarrierId === id
                    );
                    quote.OutboundLeg.Carrier.push(result.Name);
                  });
                  /*Add Origin Code*/
                  let OriginPlace = places.filter(
                    place => place.PlaceId === quote.OutboundLeg.OriginId
                  )[0];
                  quote.OutboundLeg.OriginName = OriginPlace.Name;
                  quote.OutboundLeg.OriginCode = OriginPlace.IataCode;
                  /*Add Destination Code*/
                  let DestinationPlace = places.filter(
                    place =>
                      place.PlaceId === quote.OutboundLeg.DestinationId
                  )[0];
                  quote.OutboundLeg.DestinationName =
                    DestinationPlace.Name;
                  quote.OutboundLeg.DestinationCode =
                    DestinationPlace.IataCode;
                }
                if (quote.InboundLeg) {
                  /* Add Carrier Names to object*/
                  quote.InboundLeg.Carrier = [];
                  quote.InboundLeg.CarrierIds.forEach(id => {
                    let result = carriers.filter(
                      carrier => carrier.CarrierId === id
                    );
                    quote.InboundLeg.Carrier.push(result.Name);
                  });
                  /*Add Origin Code*/
                  let OriginPlace = places.filter(
                    place => place.PlaceId === quote.InboundLeg.OriginId
                  )[0];
                  quote.InboundLeg.OriginName = OriginPlace.Name;
                  quote.InboundLeg.OriginCode = OriginPlace.IataCode;
                  /*Add Destination Code*/
                  let DestinationPlace = places.filter(
                    place =>
                      place.PlaceId === quote.InboundLeg.DestinationId
                  )[0];
                  quote.InboundLeg.DestinationName =
                    DestinationPlace.Name;
                  quote.InboundLeg.DestinationCode =
                    DestinationPlace.IataCode;
                }
              });

              /*filter quotes for budget*/
              quotes = quotes.filter(quote => quote.MinPrice <= budget);
              res.status(200).send(quotes);
            })
            .catch(err => res.status(500).send(err.response.data));
        },
  Get_Images: (req, res, next) => {
    console.log("hitter");
    const { params } = req;
    console.log("params", params.id);

    axios
      .get(
        `https://pixabay.com/api/?key=${pixKey}&q=${
          params.id
        }&image_type=photo&pretty=true`
      )
      .then(response => {
        console.log(response);
        res.status(200).send(response.data.hits[0].webformatURL);
      })
      .catch(err => console.log(err));
  },
  Add_Trip:(req,res,next)=>{
    const { 
      user_id,
      country, 
      currency, 
      locale, 
      origin, 
      destination, 
      outbound_date, 
      inbound_date, 
      budget 
    } = req.body;
    axios.get(`http://partners.api.skyscanner.net/apiservices/reference/v1.0/countries/en-US?apikey=${key}`)
    .then(countries =>{
          let countryList = countries.data.Countries;
          let selectedCountry = countryList.filter(countryObject => countryObject.Name == country);

          const dbInstance = req.app.get("db");
            dbInstance
              .add_trip([
                selectedCountry[0].Code,
                currency,
                locale,
                origin,
                destination,
                moment(outbound_date).format('YYYY-MM-DD'),
                inbound_date,
                budget
              ])
              .then(trip => {
                dbInstance
                  .add_watchlist([user_id, trip[0].trip_id])
                  .then(item => {
                    res.status(201).send(item);
                  });
              });
    }

    )

  },
   getLocations(req, res, next) {
     
   }
};
