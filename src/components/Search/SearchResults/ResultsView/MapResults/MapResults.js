import React, {Component} from 'react';
import {connect} from 'react-redux';
import flights, {getFlights, setCoords} from './../../../../../ducks/flights_reducer';
import './MapResults.css';
import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
import { setInterval, setTimeout } from 'timers';
import { log } from 'util';
import index from 'axios';

const google = window.google;

class MapResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            coords: []
        }
        this.markers = []
        this.coords = [];
    }
    
    componentDidMount() {
    //scrollspy event triggers        
        Events.scrollEvent.register('begin', function() {
            console.log('begin', arguments)
        })
        Events.scrollEvent.register('end', function() {
            console.log('end', arguments)
        })
        scrollSpy.update();

    //initialize map
      var userLoc = this.props.users.userLocation;
      let flightsData = this.props.flights.filteredFlights;
      
      const mapDiv = this.gmap;
      const self = this;
      var geocoder = new google.maps.Geocoder;
      var scrollevents = scroller;
      var markers = [];

     (function initMap() {
        var uluru = { lat: -25.363, lng: 131.044 };
        var coords = [];
        var infowindow = new google.maps.InfoWindow;
        
        self.map = new google.maps.Map(mapDiv, {
          zoom: 4,
          center: {lat: userLoc.latitude, lng: userLoc.longitude},
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
        var geocoder = new google.maps.Geocoder;
  
        mapDiv.style.right = "0vw";
        mapDiv.style.top = "0vh";
        console.log(google.maps);
      })();
      //get lat lng for destinations of searchResults
      this.props.flights.filteredFlights.forEach((cur, ind) => {
        return geocoder.geocode({'address': `${cur.destinationObj.CityName}, ${cur.destinationObj.CountryName} `}, function(results, status) {
            if(status === 'OK') {
            
                self.coords.push(results[0].geometry.location)
                self.coords[ind].id = cur.QuoteId;
                self.coords[ind].destinationObj = cur.destinationObj;
                self.coords[ind].MinPrice = cur.MinPrice;
             } else {
                console.log(status)
            }

        }) 
    })
    //setstate to coordinates array - every update to the flights array should update state here
    this.props.setCoords(self.coords);

    console.log(self.coords)
}


    componentDidUpdate(prevProps, prevState) {
        var geocoder = new google.maps.Geocoder;
        
        // self.coords = []
    
        var self = this;

        // if (this.state != prevState || this.props != prevProps) {
        //     self.coords = [];
        //     this.props.flights.filteredFlights.forEach((cur, ind) => {
        //         return geocoder.geocode({'address': `${cur.destinationObj.CityName}, ${cur.destinationObj.CountryName} `}, function(results, status) {
        //             if(status === 'OK') {
                    
        //                 self.coords.push(results[0].geometry.location)
        //                 self.coords[ind].id = cur.QuoteId;
        //                 self.coords[ind].destinationObj = cur.destinationObj;
        //                 self.coords[ind].MinPrice = cur.MinPrice;
        //              } else {
        //                 console.log(status)
        //             }
        
        //         }) 
        //     })
        //     // this.props.setCoords(self.coords)
        // }
        // var markers = []
        // markers.forEach((cur, ind) => setMap(null))
        if (this.props.flights.coords.length ) {
            // console.log('updated',this.state.coords[0].lat())

            var flightsData = this.props.flights.filteredFlights;
            var self = this;
            var geocoder = new google.maps.Geocoder;
            var scrollevents = scroller;
            for (var i =0; i<this.markers.length; i++) {
                return this.markers[i].setMap(null)
            }
            // this.markers.forEach((cur, ind) => {
            //     return cur.setMap(null)

            // })
            var markers = [];
            // self.markers = []
            
            this.props.flights.coords.forEach((cur, ind) => {
                var marker = new google.maps.Marker({
                // map: self.map,
                position: {lat: cur.lat(), lng: cur.lng()},
                animation: google.maps.Animation.DROP,
                id: cur.id
            });
            // console.log(marker)
            // markers.push(marker);
            var infowindow = new google.maps.InfoWindow;
            var infowindowContent = (
                `<div class="infowindow">
                    Fly to <span class="text-bold" >${cur.destinationObj.Name}</span> for just <span class="text-bold" >$</span><span class="text-bold" >${cur.MinPrice}</span>
                </div>`
            )
            // self.map.center = results[0].geometry.location
            infowindow.setContent(infowindowContent);
            marker.addListener( 'mouseover', function(){
                infowindow.open(self.map, marker)
            })
            marker.addListener('mouseout', function() {
                infowindow.close(self.map, marker)
            })
            marker.addListener('click', function() {
                // console.log(`flight:${marker.id}`)
                scrollevents.scrollTo(`flight:${marker.id}`, {
                    duration:800,
                    delay: 0,
                    smooth: true,
                    containerId: 'results-view',
                    offset: -100
                })
        })
    // infowindow.open(self.map,marker)
        markers.push(marker);
        })   
        
        this.markers = markers

        // console.log(this.markers.length);


    }
        this.markers.forEach((cur, ind) => cur.setMap(self.map))
        console.log(this.markers)
}
    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    render() {
        return(
            <div id="gmap" ref={ref => (this.gmap = ref)} />
        ) 
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {getFlights, setCoords})(MapResults);

