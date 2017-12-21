import React, { Component } from "react";
import { connect } from "react-redux";
import { getFlights } from "./../../../../ducks/flights_reducer";
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
    // const mapDiv = document.getElementById("gmap");
    const mapDiv = this.gmap;
    (function initMap() {
      var uluru = { lat: -25.363, lng: 131.044 };
      var map = new google.maps.Map(mapDiv, {
        zoom: 4,
        center: uluru,
        styles: [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#46bcec"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
      ]
      
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: logo,
        id: 1
      });
      // mapDiv.style.height = "90vh";
      // mapDiv.style.width = "50vw";

      mapDiv.style.right = "0vw";
      mapDiv.style.top = "0vh";

      //   mapDiv.style.resetBoundsOnResize = "magic";
      console.log(marker);
    })();
  }

  render() {
    const flightsList = this.props.flights.flights.map(flight => {
      if (!flight.carrierObj) {
        var carrier = "Malaysian Airlines";
      } else {
        var carrier = flight.carrierObj.Name;
      }
      return (
        <ResultsItem
          key={flight.QuoteId}
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
      
        <div className="row">

          <div id="results-view" className="col-lg-6">
        
            <div className="card-columns">
              {/* <UpdateSearch /> */}
              {flightsList}
            </div>
          </div>

          <div id="map-view" className="col-lg-6">
            <div id="gmap" ref={ref => (this.gmap = ref)} />
          </div>

        </div>

        // <UpdateSearch />
        // <div className="resultsContainer">
        //   <div className="resultsList">
        //     <ul>{flightsList}</ul>
        //   </div>
         
        // </div> 
      
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getFlights })(ResultsView);
