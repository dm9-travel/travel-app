import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import users,{getWatchlist} from '../../ducks/user_reducer.js';

import Trip from './Trip/Trip';

class Watchlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips:[]
    }
  }

  componentDidMount(){
    /**** Run axios.get on endpoint trips for watchlist ****/
    this.props.getWatchlist(12).then(trips=>this.setState({trips:trips.value}))
  }

  render() {
   
   if (this.state.trips.length > 0){
    const userTrips = this.state.trips
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
        {this.state.trips[0] && this.state.trips
                      .map(trip => <Trip 
                                    country={trip.country} 
                                    currency={trip.currency} 
                                    locale={trip.locale} 
                                    originPlace={trip.origin} 
                                    destinationPlace={trip.destination} 
                                    outboundDate={trip.outbound_date} 
                                    inboundDate={trip.inbound_date} 
                                    budget={trip.budget}/>
                      )}
        
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getWatchlist })(Watchlist)
);
