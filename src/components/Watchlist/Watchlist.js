import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import getWatchlist from '../../ducks/user_reducer.js';

import Trip from './Trip/Trip';

class Watchlist extends Component {

  componentDidMount(){
    /**** Run axios.get on endpoint trips for watchlist ****/
  }

  render() {
   
   if (this.props.watchlist){
    const userTrips = this.props.watchlist
                      .map(trip => <Trip 
                                    country={trip.country} 
                                    currency={trip.currency} 
                                    locale={trip.locale} 
                                    originPlace={trip.originPlace} 
                                    destinationPlace={trip.destinationPlace} 
                                    outboundDate={trip.outboundPartialDate} 
                                    inboundDate={trip.inboundPartialDate} 
                                    budget={trip.budget}/>
                      );
                    }
    

    return <div className="d.flex flex-row justify-content-center bg-white">
        <h3 className="display-3">My Trips</h3>
        
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getWatchlist })(Watchlist)
);
