import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Values entered: ' + JSON.stringify(this.state));
  }


  render() {

    return (
      
        <form onSubmit={this.handleSubmit}>
          <div className="row search-inputs">

            <div className="col-lg-4 mb-2">
              <div className="input-group input-group-lg">
                <input type="number" name="budget" className="form-control" placeholder="Budget" onChange={this.handleChange} required></input>
              </div>
            </div>

            <div className="col-lg-4 mb-2">
              <div className="input-group input-group-lg">
                <input type="date" name="departureDate" className="form-control" placeholder="Date" onChange={this.handleChange} required></input>
              </div>
            </div>

            <div className="col-lg-4 mb-2">
              <button type="submit" className="btn btn-primary btn-lg btn-block">Find your flight</button>
            </div>

          </div>
        </form>

    )
  }

}

export default Search;
