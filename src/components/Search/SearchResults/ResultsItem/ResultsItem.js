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
      time: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({ time: getTime() });
  }
  handleClick() {
    this.props.selectFlight(this.state);
  }
  //   componentDidMount() {
  //     axios.get(`/api/getImages/${this.state.destinationPlace}`).then(() => {
  //       this.setState({ imageUrl: response });
  //     });
  //   }

  render() {
    return (
      <div className="card text-left rounded-0">
        <div className="card-body">
          <h3 className="card-title">{this.props.cityName}</h3>
          <h4 className="card-subtitle mb-2 text-muted">
            {this.props.countryName}
          </h4>
          <p>
            <i className="fa fa-plane mr-2" aria-hidden="true"></i>
            From <strong>{this.props.originPlace}</strong> on{" "}
            {moment(this.props.outboundDate).format("ddd, MMMM DD")}
          </p>
          {/* <p className="text-uppercase">
            {moment(this.props.outboundDate).format("dddd, MMMM Do YYYY")}
          </p> */}
          <h2>from ${this.props.price}</h2>
          {this.props.direct ? (
            <h6 className="text-uppercase">Non stop flight</h6>
          ) : (
            <h6 className="text-uppercase">Connecting flight</h6>
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
