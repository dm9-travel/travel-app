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
      originPlace: this.props.originPlace,
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

          <div className="card text-left rounded-0">
            <div className="card-body">
              <h3 className="card-title">{this.props.destinationPlace}</h3>
              <h4 className="card-subtitle mb-2 text-muted">{this.props.destinationCountry}</h4>
              <p><i className="fa fa-plane mr-2" aria-hidden="true"></i>
From <strong>{this.props.originPlace}</strong> on {moment(this.props.outboundDate).format("ddd, MMM DD")}</p>
              {/* <p className="text-uppercase">{moment(this.props.outboundDate).format("dddd, MMMM Do YYYY")}</p> */}
              <h2>from ${this.props.price}</h2>
              { this.props.direct ? <h6 className="text-uppercase">Non stop flight</h6> : <p className="text-uppercase">Connecting flight</p> }
              <Link to="/details/"><button type="button" className="btn btn-primary">View Details</button></Link>

            </div>
          </div>

    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Quote);
