import React, { Component } from 'react';
import './App.css';
import router from './router';


// Import components
import NavBar from './components/Nav/NavBar/NavBar';
import Header from './components/Nav/Header/Header';

class App extends Component {
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
