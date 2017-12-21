import React, { Component } from "react";
import getTime from "./timeGenerator";
import moment from "moment";
import axios from "axios";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectFlight } from "../../../../ducks/flights_reducer";
import("./ResultsItem.css");

class Quote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.key,
      originPlace: this.props.originPlace,
      destinationPlace: this.props.destination,
      countryName: this.props.countryName,
      outboundDate: this.props.outboundDate,
      price: this.props.price,
      direct: this.props.direct,
      IATAcode: this.props.iataCode,
      cityName: this.props.cityName,
      airline: this.props.airline,
      name: this.props.name,
      skyCode: this.props.skyCode,
      placeId: this.props.placeId,
      originId: this.props.originId,
      carrierId: this.props.carrierId,
      time: "",
      imageUrl: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    this.setState({ time: getTime() });
    // await axios.get(`/api/getImages/${this.state.cityName}`).then(response => {
    //   console.log(response);
    //   this.setState({ imageUrl: response.data });
    // });
    // console.log(this.state.imageUrl);
  }
  handleClick() {
    this.props.selectFlight(this.state);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{this.props.destinationPlace}</h3>
          <h4 className="card-subtitle mb-2 text-muted">
            {this.props.destinationCountry}
          </h4>
          <p>
            From {this.props.originPlace} on{" "}
            {moment(this.props.outboundDate).format("dddd, MMMM Do YYYY")}
          </p>
          <p className="text-uppercase">
            {moment(this.props.outboundDate).format("dddd, MMMM Do YYYY")}
          </p>
          <h2>from ${this.props.price}</h2>
          {this.props.direct ? (
            <h6 className="text-uppercase">Non stop</h6>
          ) : (
            <p className="text-uppercase">Connecting flight</p>
          )}
          <Link to="/details/">
            <button type="button" className="btn btn-primary">
              View Details
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { selectFlight })(Quote);
