import React, {Component} from 'react';
import {connect} from 'react-redux';
import flights, {getFlights} from './../../../../../ducks/flights_reducer';
import './MapResults.css';
import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';

const google = window.google;

class MapResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
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
      var userLoc = this.props.users.userLocation;
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
     
      //   mapDiv.style.height = "90vh";
      //   mapDiv.style.width = "50vw";
  
        mapDiv.style.right = "0vw";
        mapDiv.style.top = "0vh";
        console.log(google.maps);
      })();
    }
    componentDidUpdate(prevProps, prevState) {
        
      var flightsData = this.props.flights.flights;
      var self = this;
      var geocoder = new google.maps.Geocoder;
      var scrollevents = scroller;
      var markers = [];
      var coords = [];
      
      flightsData.forEach((cur, ind) => {
          return geocoder.geocode({'address': `${cur.destinationObj.CityName}, ${cur.destinationObj.CountryName} `}, function(results, status) {
              if(status === 'OK') {
                coords.push(results[0].geometry.location)
                coords[ind].id = cur.QuoteId;
                coords[ind].destinationObj = cur.destinationObj;
                coords[ind].MinPrice = cur.MinPrice;
               } else {
                  console.log(status)
              }
          }) 
      }) 
      
      coords.forEach((cur, ind) => {
        var marker = new google.maps.Marker({
            map: self.map,
            position: {lat: cur.lat, lng: cur.lng},
            animation: google.maps.Animation.DROP,
            id: cur.id
        });
        markers.push(marker);
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
            console.log(`flight:${marker.id}`)
            scrollevents.scrollTo(`flight:${marker.id}`, {
                duration:800,
                delay: 0,
                smooth: true,
                containerId: 'results-view',
                offset: -100
            })
    })
// infowindow.open(self.map,marker)

    })

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
export default connect(mapStateToProps, {getFlights})(MapResults);

