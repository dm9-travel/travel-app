import React, { Component } from 'react';
import './App.css';
import router from './router';
import axios from 'axios';


// Import components
import NavBar from './components/Nav/NavBar/NavBar';
import Header from './components/Nav/Header/Header';
import Footer from './components/Nav/Footer/Footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      airport: {}
    };
  }



  componentDidMount() {
    //find user position
    if ("geolocation" in navigator){
    //geolocation is available 
      navigator.geolocation.getCurrentPosition(position =>{
    //Call getAirport endpoint on server
        axios
          .get( `/api/getAirport?lat=${position.coords.latitude}&long=${position.coords.longitude}`)
          .then(response =>
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              airport: response.data
            })
          );
      });
    }
  }
  



  render() {
    return (
      <div className="App">
        <NavBar />
        {router}
        <Footer />
      </div>
    );
  }
}

export default App;
