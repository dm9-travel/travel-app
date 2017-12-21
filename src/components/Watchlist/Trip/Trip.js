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
        axios
          .post("http://localhost:3001/api/getQuote", tripBody)
          .then(response => {
            console.log("quote:", response.data);
            this.setState({ quotes: response.data });
          });
    }

    render() {
        const watchArray = this.state.quotes.map(quote => {
          return <WatchlistItem price={quote.MinPrice} key={quote.QuoteId} outboundLeg={quote.OutboundLeg} inboundLeg={quote.InboundLeg} />;
        });

        return <div>
            <h4>
              {this.props.originPlace} To {this.props.destinationPlace}
            </h4>
            {watchArray}
          </div>;
    }
}

export default Trip;