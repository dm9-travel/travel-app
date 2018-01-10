import React, { Component } from "react";
import { connect } from "react-redux";
import { Link,withRouter } from "react-router-dom";

import { getFlights, setSearch } from "./../../../ducks/flights_reducer";
import { sendBudget } from "./../../../ducks/user_reducer";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "US",
      currency: "USD",
      locale: "en-US",
      originPlace: "DFW",
      destinationPlace: "Anywhere",
      outboundPartialDate: "",
      inboundPartialDate: "",
      budget: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps,prevState){
    if (this.props.users.userLocation.airport && this.props.users.userLocation.airport.CityId !== this.state.originPlace) {
            this.setState({
              originPlace: this.props.users.userLocation.airport.CityId
          })
        }
      }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name,value)
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    // alert("Values entered: " + JSON.stringify(this.state));
    event.preventDefault();
    this.props.setSearch(this.state);
    this.props.sendBudget(this.state.budget);
    this.props.getFlights(this.state).then(() => this.props.history.push('/searchResults'));

    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      
        <div className="row search-inputs mt-4">
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
          
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              onSubmit={this.handleSubmit}
            >
              Find your flight
            </button>
          
        </div>

        </div>

      </form>
    );
  }
}
const mapStateToProps = state => state;


export default withRouter(connect(mapStateToProps, { getFlights, setSearch, sendBudget })(Search));


