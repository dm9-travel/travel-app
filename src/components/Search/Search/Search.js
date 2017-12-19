import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  render() {

    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="input-group input-group-lg">
            <input type="number" className="form-control" placeholder="Budget" aria-label="Number input"></input>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="input-group input-group-lg">
            <input type="date" className="form-control" placeholder="Date" aria-label="Date input"></input>
          </div>
        </div>

        <div className="col-lg-4">

          <p className="lead">
            <a className="btn btn-primary btn-lg btn-block" href="#" role="button">Find your flight</a>
          </p>
          
        </div>
      </div>
    )
  }

}

export default Search;
