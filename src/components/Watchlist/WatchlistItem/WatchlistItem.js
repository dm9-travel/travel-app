import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class WatchlistItem extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        
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

// DestinationCode OriginCode Carrier[0] DepartureDate

        return <div className="card" style={cardStyle}>
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <h4 className="card-title">{originCity} To {destinationCity}</h4>
                <h6 className="card-subtitle text-muted">${price}</h6>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center flex-wrap">
                {this.props.outboundLeg && <div className="d-flex flex-row justify-content-between" style={rowStyle}>
                  <span className="card-text">{moment(this.props.outboundLeg.DepartureDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                  <span className="card-text">{this.props.outboundLeg.OriginCode}-{this.props.outboundLeg.DestinationCode}</span>
                </div>}
                {this.props.inboundLeg && <div className="d-flex flex-row justify-content-between" style={rowStyle}>
                  <span className="card-text">{moment(this.props.inboundLeg.DepartureDate ).format("dddd, MMMM Do YYYY, h:mm:ss a") }</span>
                  <span className="card-text">{this.props.inboundLeg.OriginCode}-{this.props.inboundLeg.DestinationCode}</span>
                </div>}
              </div>
              <div className="d-flex flex-row justify-content-start">
                <a href="#" className="card-link">
                  Details <i className="fa fa-external-link-square" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>;
    }
}

export default WatchlistItem;