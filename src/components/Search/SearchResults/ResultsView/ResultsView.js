import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import flights, { getFlights } from "./../../../../ducks/flights_reducer";
import UpdateSearch from "./../UpdateSearch/UpdateSearch";
import ResultsItem from "../ResultsItem/ResultsItem.js";
import "./ResultsView.css";
import NavBar from './../../../Nav/NavBar/NavBar';
import MapResults from './MapResults/MapResults';



import logo from "./../../../Nav/NavBar/logo.svg";
import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';

const google = window.google;

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state ={
        markers: [],
    }
  }

  componentDidMount() {
      Events.scrollEvent.register('begin', function() {
          console.log('begin', arguments)
      })
      Events.scrollEvent.register('end', function() {
          console.log('end', arguments)
      })
      scrollSpy.update();
    
  }
  
    
  componentWillUnmount() {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
  }
  render() {
    const flightsList = this.props.flights.flights.map((flight, ind) => {
      if (!flight.carrierObj) {
        var carrier = "Malaysian Airlines";
      } else {
        var carrier = flight.carrierObj.Name;
      }
      return (
        <Element name={`flight:${flight.QuoteId}`} key={flight.QuoteId} >
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
        </Element>
      );
    });
    return (
      <div>
          <NavBar/>
          
        <div className="row">
          
        {/* <UpdateSearch /> */}
          <div id="results-view" className="col-lg-6">
          
            <div className="card-columns">
              
              {flightsList}
            </div>
          </div>

          <div id="map-view" className="col-lg-6">
            <MapResults/>
          </div>

        </div>

        {/* // <UpdateSearch />
        // <div className="resultsContainer">
        //   <div className="resultsList">
        //     <ul>{flightsList}</ul>
        //   </div>
         
        // </div>  */}
        <div>
            <UpdateSearch
                flightsArray={this.props.flights.flights}
            />
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getFlights })(ResultsView));
