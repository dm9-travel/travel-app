import React, { Component } from 'react';
import Nav from './components/Nav/Nav/Nav';
import logo from './logo.svg';
import './App.css';
import router from './router';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        
        {router}
      </div>

    );
  }
}

export default App;
