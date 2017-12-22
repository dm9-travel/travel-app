import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import flights, { getFlights } from "./../../../../ducks/flights_reducer";
import UpdateSearch from "./../UpdateSearch/UpdateSearch";
import ResultsItem from "../ResultsItem/ResultsItem.js";
import "./ResultsView.css";
import NavBar from "./../../../Nav/NavBar/NavBar";

import logo from "./../../../Nav/NavBar/logo.svg";
import * as Scroll from "react-scroll";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

const google = window.google;

class ResultsView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });
    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });
    scrollSpy.update();
    var userLoc = this.props.users.userLocation;
    let flightsData = this.props.flights.flights;
    console.log(flightsData);
    const mapDiv = this.gmap;
    const self = this;
    (function initMap() {
      var uluru = { lat: -25.363, lng: 131.044 };
      var coords = [];
      var infowindow = new google.maps.InfoWindow();

      self.map = new google.maps.Map(mapDiv, {
        zoom: 4,
        center: { lat: userLoc.latitude, lng: userLoc.longitude },
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#444444"
              }
            ]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f2f2f2"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: -100
              },
              {
                lightness: 45
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#46bcec"
              },
              {
                visibility: "on"
              }
            ]
          }
        ]
      });
      var geocoder = new google.maps.Geocoder();

      //   mapDiv.style.height = "90vh";
      //   mapDiv.style.width = "50vw";

      mapDiv.style.right = "0vw";
      mapDiv.style.top = "0vh";
      console.log(google.maps);
    })();
  }
  componentDidUpdate() {
    var flightsData = this.props.flights.flights;
    var self = this;
    var geocoder = new google.maps.Geocoder();
    var scrollevents = scroller;

    flightsData.forEach((cur, ind) => {
      return geocoder.geocode(
        {
          address: `${cur.destinationObj.CityName}, ${
            cur.destinationObj.CountryName
          } `
        },
        function(results, status) {
          if (status === "OK") {
            var marker = new google.maps.Marker({
              map: self.map,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP,
              id: cur.QuoteId
            });
            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = `<div class="infowindow">
                        Fly to <span class="text-bold" >${
                          cur.destinationObj.Name
                        }</span> for just <span class="text-bold" >$</span><span class="text-bold" >${
              cur.MinPrice
            }</span>
                    </div>`;
            self.map.center = results[0].geometry.location;
            infowindow.setContent(infowindowContent);
            marker.addListener("mouseover", function() {
              infowindow.open(self.map, marker);
            });
            marker.addListener("mouseout", function() {
              infowindow.close(self.map, marker);
            });
            marker.addListener("click", function() {
              console.log(`flight:${marker.id}`);
              scrollevents.scrollTo(`flight:${marker.id}`, {
                duration: 800,
                delay: 0,
                smooth: true,
                containerId: "results-view",
                offset: -100
              });
            });
            // infowindow.open(self.map,marker)
          } else {
            console.log(status);
          }
        }
      );
    });
  }
  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
  render() {
    const flightsList = this.props.flights.flights.map((flight, ind) => {
      if (!flight.carrierObj) {
        var carrier = "Malaysian Airlines";
      } else {
        var carrier = flight.carrierObj.Name;
      }
      return (
        <Element name={`flight:${flight.QuoteId}`} key={flight.QuoteId}>
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
        <NavBar />

        <div className="row">
          {/* <UpdateSearch /> */}
          <div id="results-view" className="col-lg-6">
            <div className="card-columns">{flightsList}</div>
          </div>

          <div id="map-view" className="col-lg-6">
            <div id="gmap" ref={ref => (this.gmap = ref)} />
          </div>
        </div>

        {/* // <UpdateSearch />
        // <div className="resultsContainer">
        //   <div className="resultsList">
        //     <ul>{flightsList}</ul>
        //   </div>
         
        // </div>  */}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getFlights })(ResultsView)
);
