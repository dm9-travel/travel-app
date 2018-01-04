import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
const google = window.google;

export default {
    coordinateCalculator: async (coords, flightsData, markers) => {
        let geocodePromises = []
        var geocoder = new google.maps.Geocoder;
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

      

      coords = await Promise.all(geocodePromises)
  
  var geocoder = new google.maps.Geocoder;
  var scrollevents = scroller;
  var markers = [];

  coords.forEach((cur, ind) => {
      var marker = new google.maps.Marker({
      map: this.map,
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
        infowindow.open(this.map, marker)
        })
        marker.addListener('mouseout', function() {
        infowindow.close(this.map, marker)
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

    // this.setState({markers: markers})    
    },
    initMap: function initMap(mapDiv, userLoc) {
        var uluru = { lat: -25.363, lng: 131.044 };
        var coords = [];
        var infowindow = new google.maps.InfoWindow;
        
        this.map = new google.maps.Map(mapDiv, {
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
      },

}