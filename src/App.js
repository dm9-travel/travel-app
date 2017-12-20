import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import router from "./router";
import axios from "axios";

// Import components
import { getLocation } from "./ducks/user_reducer.js";
import NavBar from "./components/Nav/NavBar/NavBar";
import Header from "./components/Nav/Header/Header";
import Footer from "./components/Nav/Footer/Footer";

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
    if ("geolocation" in navigator) {
      //geolocation is available
      navigator.geolocation.getCurrentPosition(position => {
        //Call getAirport endpoint on server
        axios
          .get(
            `/api/getAirport?lat=${position.coords.latitude}&long=${
              position.coords.longitude
            }`
          )
          .then(response =>
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              airport: response.data
            })
          );
        console.log(this.state);
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

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getLocation })(App);
