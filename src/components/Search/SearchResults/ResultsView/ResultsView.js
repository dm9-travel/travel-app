import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFlights} from './../../../../ducks/flights_reducer';
import UpdateSearch from './../UpdateSearch/UpdateSearch';
import './ResultsView.css';

import logo from './../../../Nav/NavBar/logo.svg';

const google = window.google;


class ResultsView extends Component {
    constructor(props) {
        super(props)

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
          console.log(marker)
        })();
      }

    render() {
        const flightsList = this.props.flights.flights.map((flight) => {
            return (
                <div>
                    {flight.MinPrice}, {flight.QuoteId}
                </div>
            )
        })
        return (
            <div className="results">
            <UpdateSearch/>
                <div className="resultsContainer" >
                    <div className="resultsList" >
                        {flightsList}
                    </div>
                    <div id='gmap' ref={ref => this.gmap =ref} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getFlights})(ResultsView);
