import React, { Component } from 'react';

import './Header.css';

// Import components
import Search from './../../Search/Search/Search';


class Header extends Component {
  render() {

    return (
      <div className="jumbotron jumbotron-fluid bg-info">
        <div className="container">
          <div className="w-80">
            <h1 className="display-3">Explore the World</h1>
            <p className="lead">This is a simple hero unit, a jumbotron component for calling extra attention to featured content.</p>
            <Search />
          </div>
        </div>
      </div>
    )
  }

}

export default Header;
