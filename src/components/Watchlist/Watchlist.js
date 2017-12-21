import React, {Component} from 'react';

import WatchlistItem from './WatchlistItem/WatchlistItem';

class Watchlist extends Component {
  render() {
    const watchArray=[1,2,3,4].map(response =>{return <WatchlistItem/>})


    return <div className="d.flex flex-row justify-content-center">
        <h3>My Trips</h3>
        {watchArray}
      </div>;
  }
}

export default Watchlist;
