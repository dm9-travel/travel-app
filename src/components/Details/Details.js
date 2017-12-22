import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import flights, { getFlights } from "../../ducks/flights_reducer";

class Details extends Component {
  render() {
    return (
    <div className="details-main">
        <h4>
          {this.props.flights.selectedFlight.originPlace} to {this.props.flights.selectedFlight.cityName}
        </h4>
    </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getFlights })(Details));
