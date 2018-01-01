import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { selectFlight } from '../../../ducks/flights_reducer';
import getTime from "../../Search/SearchResults/ResultsItem/timeGenerator";
import getDuration from "../../Search/SearchResults/ResultsItem/durationGenerator";

class WatchlistItem extends Component {
    constructor(props){
        super(props);
        this.state = {
          key:1 ,
          originPlace: this.props.outboundLeg.OriginCode,
          destinationPlace: this.props.outboundLeg.DestinationCode,
          countryName:this.props.country,
          outboundDate: this.props.outboundLeg.DepartureDate,
          price: this.props.price,
          direct: this.props.direct,
          IATAcode: this.props.outboundLeg.DestinationCode,
          cityName: this.props.outboundLeg.DestinationName,
          airline: this.props.outboundLeg.Carrier[0],
          name: this.props.outboundLeg.DestinationName,
          skyCode: this.props.outboundLeg.DestinationCode,
          placeId: this.props.outboundLeg.DestinationId,
          originId: this.props.outboundLeg.OriginId,
          carrierId: this.props.outboundLeg.CarrierIds[0],
          time: "",
          imageUrl: "",
          duration: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.setState({ time: getTime(), duration: getDuration() });
    }
    handleClick() {
    this.props.selectFlight(this.state);
    }

    render() {
        let cardStyle={width:"90%",margin:"1rem"};
        let rowStyle={width:"100%"};
        let price = this.props.price;
        let originCity;
        let destinationCity;
        if(this.props.outboundLeg){
            originCity = this.props.outboundLeg.OriginName;
            destinationCity = this.props.outboundLeg.DestinationName;
        }else if(this.props.inboundLeg){
            originCity = this.props.inboundLeg.OriginName;
            destinationCity = this.props.inboundLeg.DestinationName;
        }


        return (
        <div className="card" style={cardStyle}>
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <h4 className="card-title">{originCity} To {destinationCity}</h4>
                <h6 className="card-subtitle text-muted">${price}</h6>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center flex-wrap">
                {this.props.outboundLeg && <div className="d-flex flex-row justify-content-between" style={rowStyle}>
                  <span className="card-text">{moment(this.props.outboundLeg.DepartureDate).format("dddd, MMMM Do YYYY")} at {moment(`2014-09-08T${this.state.time}`).format("H:mm A")}</span>
                  <span className="card-text">{this.props.outboundLeg.OriginCode}-{this.props.outboundLeg.DestinationCode}</span>
                </div>}
                {this.props.inboundLeg && <div className="d-flex flex-row justify-content-between" style={rowStyle}>
                  <span className="card-text">{moment(this.props.inboundLeg.DepartureDate ).format("dddd, MMMM Do YYYY") } at {this.state.time}</span>
                  <span className="card-text">{this.props.inboundLeg.OriginCode}-{this.props.inboundLeg.DestinationCode}</span>
                </div>}
              </div>
              <div className="d-flex flex-row justify-content-start">
                <Link to="/details/">
                  <button type="button" className="btn btn-primary" onClick={this.handleClick}>
                    Details
                  </button>
                </Link>
              </div>
            </div>
      </div>
      );
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { selectFlight })(WatchlistItem);