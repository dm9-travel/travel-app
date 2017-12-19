import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  render() {

    return (
      <div className="row">
        <div className="col-lg-3">
          <div className="input-group input-group-lg">
            <input type="text" className="form-control" placeholder="Budget" aria-label="Text input"></input>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="input-group input-group-lg">
            <input type="text" className="form-control" placeholder="Date" aria-label="Text input"></input>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="input-group input-group-lg">
            <input type="text" className="form-control" placeholder="Location" aria-label="Text input with radio button"></input>
          </div>
        </div>
        <div className="col-lg-2">

          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Find your flight</a>
          </p>
          
        </div>
      </div>
    )
  }

}

export default Search;
