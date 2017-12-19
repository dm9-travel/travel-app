import React, { Component } from 'react';
import './App.css';
import router from './router';


// Import components
import NavBar from './components/Nav/NavBar/NavBar';
import Header from './components/Nav/Header/Header';
import Footer from './components/Nav/Footer/Footer'

class App extends Component {


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
