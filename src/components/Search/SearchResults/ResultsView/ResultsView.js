import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
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
        center: uluru
      });
    // google.maps.Geocoder.geocode({"placeId": '1463'}, function (results, status) {
    //     if (status === 'OK') {
    //         map.setZoom(11);
    //         map.setCenter(results[0].geometry.location);
    //     }
    // })
      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: logo,
        id: 1
      });
      mapDiv.style.height = "90vh";
      mapDiv.style.width = "50vw";

      mapDiv.style.right = "0vw";
      mapDiv.style.top = "0vh";

      //   mapDiv.style.resetBoundsOnResize = "magic";
      console.log(marker);
    })();
  }

  render() {
    const flightsList = this.props.flights.flights.map(flight => {
      return (
        <ResultsItem
          key={flight.QuoteId}
          destinationPlace={flight.destinationObj.Name}
          destinationCountry={flight.destinationObj.CountryName}
          originPlace={this.props.users.userLocation.airport.PlaceName}
          outboundDate={flight.OutboundLeg.DepartureDate}
          price={flight.MinPrice}
          direct={flight.Direct}
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
