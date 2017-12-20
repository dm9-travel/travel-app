import React, { Component } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import("./ResultsItem.css");

class Quote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.key,
      country: this.props.friend_id,
      originPlace: this.props.image,
      destinationPlace: this.props.destination,
      destinationCountry: this.props.destinationCountry,
      outboundDate: this.props.outboundDate,
      inboundDate: this.props.inboundDate,
      price: this.props.price,
      direct: this.props.direct
    };
  }

  render() {
    return (
      <li>
        <Link to="/quoteDetails">
          <p>
            {this.props.destinationPlace}, {this.props.destinationCountry}
          </p>
          <p>${this.props.price}</p>
          <p>{moment(this.props.outboundDate).format("dddd, MMMM Do YYYY")}</p>
        </Link>
      </li>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Quote);
