import React, {Component} from 'react';
import {connect} from 'react-redux';
import flights, {getFlights, setCoords} from './../../../../../ducks/flights_reducer';
import './MapResults.css';
import MapMethods from './MapService';
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
    
    async componentDidMount() {
    //scrollspy event triggers    
    // MapMethods.coordinateCalculator.apply(this, coordinateCalculatorParams)
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

     MapMethods.initMap.call(this, this.gmap, userLoc);
      //get lat lng for destinations of searchResults
      
          let geocodePromises = []
          for (let i =0; i <10; i++) {
              geocodePromises.push( new Promise( (resolve, reject) => {
                  geocoder.geocode({'address': `${flightsData[i].destinationObj.CityName}, ${flightsData[i].destinationObj.CountryName} `}, function(results, status) {
                  if(status === 'OK') { 
                      let obj =  results[0].geometry.location            
                      obj.id = flightsData[i].QuoteId;
                      obj.destinationObj = flightsData[i].destinationObj;
                      obj.MinPrice = flightsData[i].MinPrice;
                      resolve(obj)
                  } else {
                      console.log(status)
                  }
              }) 
              }) 
          )}

        

        self.coords = await Promise.all(geocodePromises)
    
    var geocoder = new google.maps.Geocoder;
    var scrollevents = scroller;
    var markers = [];

    self.coords.forEach((cur, ind) => {
        var marker = new google.maps.Marker({
        map: self.map,
        position: {lat: cur.lat(), lng: cur.lng()},
        animation: google.maps.Animation.DROP,
        id: cur.id
    });

    var infowindow = new google.maps.InfoWindow;
    var infowindowContent = (
        `<div class="infowindow">
            Fly to <span class="text-bold" >${cur.destinationObj.Name}</span> for just <span class="text-bold" >$</span><span class="text-bold" >${cur.MinPrice}</span>
        </div>`
    )

    infowindow.setContent(infowindowContent);
    marker.addListener( 'mouseover', function(){
        infowindow.open(self.map, marker)
    })
    marker.addListener('mouseout', function() {
        infowindow.close(self.map, marker)
    })
    marker.addListener('click', function() {
        scrollevents.scrollTo(`flight:${marker.id}`, {
            duration:800,
            delay: 0,
            smooth: true,
            containerId: 'results-view',
            offset: -100
        })
})

markers.push(marker);
})   

    this.setState({markers: markers})    
}



async componentDidUpdate(prevProps, prevState) {
    // MapMethods.coordinateCalculator.call(this, this.coords, this.props.flights.filteredFlights)
        var geocoder = new google.maps.Geocoder;
        var self = this;
        
        if (this.props.flights.filteredFlights != prevProps.flights.filteredFlights){
            var markersCopy = this.state.markers.map((cur, ind) => {
                if(!this.props.flights.filteredFlights.find((x) => x.QuoteId == cur.id)) {
                    cur.setMap(null);
                    return cur;
                }
                else {
                    cur.setMap(self.map)
                    return cur;
                }
                
            })
        this.setState({markers: markersCopy})
        var flightsData = this.props.flights.filteredFlights
        let geocodePromises = []
          for (let i =0; i <flightsData.length; i++) {
              geocodePromises.push( new Promise( (resolve, reject) => {
                  geocoder.geocode({'address': `${flightsData[i].destinationObj.CityName}, ${flightsData[i].destinationObj.CountryName} `}, function(results, status) {
                  if(status === 'OK') { 
                      let obj =  results[0].geometry.location            
                      obj.id = flightsData[i].QuoteId;
                      obj.destinationObj = flightsData[i].destinationObj;
                      obj.MinPrice = flightsData[i].MinPrice;
                      resolve(obj)
                  } else {
                      console.log(status)
                  }
              }) 
              }) 
          )}

        

        self.coords = await Promise.all(geocodePromises)
        
    var geocoder = new google.maps.Geocoder;
    var scrollevents = scroller;
    var markers = [];

    self.coords.forEach((cur, ind) => {
        var marker = new google.maps.Marker({
        map: self.map,
        position: {lat: cur.lat(), lng: cur.lng()},
        animation: google.maps.Animation.DROP,
        id: cur.id
    });

    var infowindow = new google.maps.InfoWindow;
    var infowindowContent = (
        `<div class="infowindow">
            Fly to <span class="text-bold" >${cur.destinationObj.Name}</span> for just <span class="text-bold" >$</span><span class="text-bold" >${cur.MinPrice}</span>
        </div>`
    )

    infowindow.setContent(infowindowContent);
    marker.addListener( 'mouseover', function(){
        infowindow.open(self.map, marker)
    })
    marker.addListener('mouseout', function() {
        infowindow.close(self.map, marker)
    })
    marker.addListener('click', function() {
        scrollevents.scrollTo(`flight:${marker.id}`, {
            duration:800,
            delay: 0,
            smooth: true,
            containerId: 'results-view',
            offset: -100
        })
})

markers.push(marker);
})
    }
    
    //     if (this.props.flights.coords.length ) {
    //         var flightsData = this.props.flights.filteredFlights;
    //         var self = this;
    //         var geocoder = new google.maps.Geocoder;
    //         var scrollevents = scroller;
            
    // }
    //     this.markers.forEach((cur, ind) => cur.setMap(self.map))
    //     console.log(this.markers)

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