import React, {Component} from 'react';

import Trip from './Trip/Trip';

class Watchlist extends Component {

  componentDidMount(){
    /**** Run axios.get on endpoint trips for watchlist ****/
  }

  render() {
    /** Test Array For Trips needs to be replaced with a call **/
    let testTrips = [{ trip_id: 1, country: "US", currency: "USD", locale: "en-US", originPlace: "DEN", destinationPlace: "ABQ", outboundPartialDate: "2018-01-10", inboundPartialDate: "2018-01-17", budget: 200 }, { trip_id: 2, country: "US", currency: "USD", locale: "en-US", originPlace: "BFI", destinationPlace: "ESD", outboundPartialDate: "2018-01-18", inboundPartialDate: "2018-01-22", budget: 800 }, { trip_id: 3, country: "US", currency: "USD", locale: "en-US", originPlace: "ESD", destinationPlace: "FRD", outboundPartialDate: "2018-01-18", inboundPartialDate: "2018-01-22", budget: 800 }];

    const userTrips = testTrips
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

    return <div className="d.flex flex-row justify-content-center bg-light">
        <h3 className="display-3">My Trips</h3>
        {userTrips}
      </div>;
  }
}

export default Watchlist;
