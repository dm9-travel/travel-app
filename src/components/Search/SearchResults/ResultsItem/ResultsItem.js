import React, { Component } from "react";
import getTime from "./timeGenerator";
import getDuration from "./durationGenerator";
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
      imageUrl: "https://openclipart.org/download/168858/sydney-skyline.svg",
      duration: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.setState({ time: getTime(), duration: getDuration() });
    // await axios.get(`/api/getImages/${this.state.cityName}`).then(response => {
    //   // console.log('CITY IMAGE: ', response);
      // this.setState({ imageUrl: response.data });
    // });
  }

  handleClick() {
    this.props.selectFlight(this.state);
  }

  render() {
    return (
      <div className="card cart-title-bg text-left rounded-0">
        <Link to="/details/" onClick={this.handleClick}>
        
        <div className="img-gradient">
          <img className="card-img-top sized img-responsive" src={this.state.imageUrl} alt="Card image cap"></img>
        </div>
        
        <div className="card-img-overlay">
          <span><h3 className="card-title result-item">{this.props.cityName}</h3></span>
          <h5 className="card-subtitle">
            {this.props.countryName}
          </h5>
        </div>
        </Link>
        
        <div className="card-body">
          <p>
            <i className="fa fa-plane mr-2" aria-hidden="true" />
            From <strong>{this.props.originPlace}</strong> on{" "}
            {moment(this.props.outboundDate).format("ddd, MMMM DD")}
          </p>
          {/* <p className="text-uppercase">
            {moment(this.props.outboundDate).format("dddd, MMMM Do YYYY")}
          </p> */}
          <h3>from ${this.props.price}</h3>
          {this.props.direct ? (
            <h6 className="text-uppercase">Non stop flight</h6>
          ) : (
            <h6 className="text-uppercase">Connecting flight</h6>
          )}
          
            {/* <button type="button" className="btn btn-primary" onClick={this.handleClick}>
              View Details
            </button> */}
          
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { selectFlight })(Quote);
