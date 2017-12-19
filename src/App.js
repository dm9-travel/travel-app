import React, { Component } from 'react';

import './App.css';

// Import components
import NavBar from './components/Nav/NavBar/NavBar';
import Header from './components/Nav/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">

        <NavBar />
        <Header />

      </div>

    );
  }
}

export default App;
