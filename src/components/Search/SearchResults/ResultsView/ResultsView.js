import React, {Component} from 'react';
const google = window.google;

class ResultsView extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const mapDiv = document.getElementById("gmap");
        (function initMap() {
          var uluru = { lat: -25.363, lng: 131.044 };
          var map = new google.maps.Map(mapDiv, {
            zoom: 4,
            center: uluru
          });
          var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            id: 1
          });
          mapDiv.style.height = "100%";
          mapDiv.style.width = "50vw";
          console.log(marker)
        })();
      }

    render() {
        return (
            <div id='gmap' />
        )
    }
}
export default ResultsView;
