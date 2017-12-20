import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getFlights } from "./../../../ducks/flights_reducer.js";

import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "US",
      currency: "USD",
      locale: "en-US",
      originPlace: this.props.users.userLocation.airport.PlaceName,
      destinationPlace: "Anywhere",
      outboundPartialDate: "",
      inboundPartialDate: "",
      budget: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    console.log("submit fired", this.state);
    event.preventDefault();
    // alert("Values entered: " + JSON.stringify(this.state));
    await this.props.getFlights(this.state);
    window.location.href = "http://localhost:3000/searchResults";
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row search-inputs">
          <div className="col-lg-4 mb-2">
            <div className="input-group input-group-lg">
              <input
                type="number"
                name="budget"
                className="form-control"
                placeholder="Budget"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <div className="input-group input-group-lg">
              <input
                type="date"
                name="outboundPartialDate"
                className="form-control"
                placeholder="Date"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="col-lg-4 mb-2">
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Find your flight
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getFlights })(Search);
