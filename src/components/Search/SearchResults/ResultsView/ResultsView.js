import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import flights, { getFlights } from "./../../../../ducks/flights_reducer";
import UpdateSearch from "./../UpdateSearch/UpdateSearch";
import ResultsItem from "../ResultsItem/ResultsItem.js";
import "./ResultsView.css";

import logo from "./../../../Nav/NavBar/logo.svg";

const google = window.google;

class ResultsView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
    let flightsData = this.props.flights.flights;
    console.log(flightsData)
    const mapDiv = this.gmap;
    const self = this;
   (function initMap() {
      var uluru = { lat: -25.363, lng: 131.044 };
      var coords = [];
      var infowindow = new google.maps.InfoWindow;
      
      self.map = new google.maps.Map(mapDiv, {
        zoom: 4,
        center: uluru
      });
      var geocoder = new google.maps.Geocoder;
   
      mapDiv.style.height = "90vh";
      mapDiv.style.width = "50vw";

      mapDiv.style.right = "0vw";
      mapDiv.style.top = "0vh";
      console.log(google.maps);
    })();
  }
  componentDidUpdate() {
    var flightsData = this.props.flights.flights;
    var self = this;
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    flightsData.forEach((cur, ind) => {
        return geocoder.geocode({'address': `${cur.destinationObj.CityName}`}, function(results, status) {
            if(status === 'OK') {
                var marker = new google.maps.Marker({
                    map: self.map,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    id: cur.QuoteId
                });
                self.map.center = results[0].geometry.location
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(self.map,marker)
                console.log('geocode')
            } else {
                console.log(status)
            }
        })
      
       
    }) 
  }

  render() {
    const flightsList = this.props.flights.flights.map((flight, ind) => {
      if (!flight.carrierObj) {
        var carrier = "Malaysian Airlines";
      } else {
        var carrier = flight.carrierObj.Name;
      }
      return (
        <ResultsItem
          key={flights.QuoteId}
          destinationPlace={flight.destinationObj.Name}
          countryName={flight.destinationObj.CountryName}
          originPlace={this.props.users.userLocation.airport.PlaceName}
          outboundDate={flight.OutboundLeg.DepartureDate}
          price={flight.MinPrice}
          direct={flight.Direct}
          iataCode={flight.destinationObj.IataCode}
          cityName={flight.destinationObj.CityName}
          airline={carrier}
          name={flight.destinationObj.Name}
          skyCode={flight.destinationObj.SkyscannerCode}
          placeId={flight.destinationObj.placeId}
          originId={flight.OutboundLeg.OriginId}
          carrierId={flight.OutboundLeg.CarrierIds[0]}
        />
      );
    });
    return (
      <div className="results">
        <UpdateSearch />
        <div className="resultsContainer">
          <div className="resultsList">
            <ul>{flightsList}</ul>
          </div>
          <div id="gmap" ref={ref => (this.gmap = ref)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getFlights })(ResultsView));
