import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Search.css';

class Search extends Component {
  render() {

    return (
      <div className="row search-inputs">
        <div className="col-lg-4">
          <div className="input-group input-group-lg">
            <span class="input-group-addon">$</span>
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
            <Link className="btn btn-primary btn-lg" to="/searchResults" role="button">Find your flight</Link>
          </p>
          
        </div>
      </div>
    )
  }

}

export default Search;
