import React, { Component } from "react";
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
      country: this.props.friend_id,
      originPlace: this.props.originPlace,
      destinationPlace: this.props.destination,
      destinationCountry: this.props.destinationCountry,
      outboundDate: this.props.outboundDate,
      price: this.props.price,
      direct: this.props.direct
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.selectFlight(this.state);
  }
  componentDidMount() {
    axios.get(`/api/getImages/${this.state.destinationPlace}`).then(() => {
      this.setState({ imageUrl: response });
    });
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
