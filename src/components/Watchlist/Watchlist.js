import React, {Component} from 'react';
import axios from 'axios';

import WatchlistItem from './WatchlistItem/WatchlistItem';

class Watchlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes:[]
    }
  }

  componentDidMount(){
    let testBody = { country: "US", currency: "USD", locale: "en-US", originPlace: "DEN", destinationPlace: "ABQ", outboundPartialDate: "2018-01-10", inboundPartialDate: "2018-01-17" };
    axios.post("/api/getQuote",testBody).then(response=>this.setState({quotes:response.data}));
  }

  render() {
    const watchArray=this.state.quotes.map(quote =>{return <WatchlistItem price={quote.MinPrice} key={quote.QuoteId} outboundLeg={quote.OutboundLeg} inboundLeg={quote.InboundLeg} />;})
    return <div className="d.flex flex-row justify-content-center">
        <h3>My Trips</h3>
        {watchArray}
      </div>;
  }
}

export default Watchlist;
