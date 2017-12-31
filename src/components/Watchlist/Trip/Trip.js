import React, { Component } from 'react';
import axios from "axios";

import WatchlistItem from "../WatchlistItem/WatchlistItem";

class Trip extends Component {
    constructor(props){
        super(props);
        this.state={
            quotes:[]
        };

    }

    componentDidMount(){
        let tripBody = { 
            country: this.props.country, 
            currency: this.props.currency, 
            locale: this.props.locale,
             originPlace: this.props.originPlace, 
             destinationPlace: this.props.destinationPlace, 
             outboundPartialDate: this.props.outboundDate, 
             inboundPartialDate: this.props.inboundDate, 
             budget:this.props.budget 
            };
        console.log("tripBody:",tripBody)
        axios
          .post("http://localhost:3001/api/getQuote", tripBody)
          .then(response => {
            console.log("quote:", response.data);
            this.setState({ quotes: response.data });
          });
    }

    render() {
        const watchArray = this.state.quotes.map(quote => {
          return <WatchlistItem price={quote.MinPrice} key={quote.QuoteId} outboundLeg={quote.OutboundLeg} inboundLeg={quote.InboundLeg} direct={quote.Direct} country={this.props.country}/>;
        });

        const tripStyle = { width: "90%",padding:"1rem", margin:"1rem" };

        return (
        <div className="bg-dark rounded" style={tripStyle}>
              <h4 className="text-light d-flex justify-content-between">
                {this.props.originPlace} To {this.props.destinationPlace}
                <span className="badge badge-light">
                  Budget ${this.props.budget}
                </span>
              </h4>
              <button type="button" className="btn btn-danger d-flex justify-content-start">Delete</button>
            {watchArray}
        </div>
        );
    }
}

export default Trip;