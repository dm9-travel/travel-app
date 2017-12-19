import React, { Component } from 'react';
<<<<<<< HEAD
import Nav from './components/Nav/Nav/Nav';
import logo from './logo.svg';
=======

>>>>>>> master
import './App.css';
import router from './router';


// Import components
import NavBar from './components/Nav/NavBar/NavBar';
import Header from './components/Nav/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <Nav/>
        
        {router}
=======

        <NavBar />
        <Header />

>>>>>>> master
      </div>

    );
  }
}

export default App;
