import React, { Component } from 'react';
import './App.css';
import router from './router';


// Import components
import NavBar from './components/Nav/NavBar/NavBar';
import Header from './components/Nav/Header/Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude:null,
      longitude:null
    }
  }

  componentDidMount(){
    //find user position
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position => this.setState({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
      }))
      
    }
  }


 
  render() {
    return (
      <div className="App">

        <NavBar />
        {router}
      
      </div>

    );
  }
}

export default App;
