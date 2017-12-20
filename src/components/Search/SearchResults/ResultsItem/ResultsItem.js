import React, { Component } from "react";
import moment from "moment";

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
      <li>
        <Link to="/quoteDetails" onClick={this.handleClick}>
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
export default connect(mapStateToProps, { selectFlight })(Quote);
