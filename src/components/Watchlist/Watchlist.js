import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWatchlist } from '../../ducks/user_reducer.js';

import Trip from './Trip/Trip';
import NavBar from "../Nav/NavBar/NavBar";

import './Watchlist.css';

class Watchlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      fireRedirect: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
  }
  componentDidMount(props) {
    this.props
      .getWatchlist(this.props.users.currentUser.user_id);

    if (!this.props.users.currentUser.user_id) {
      alert("login to create a watch list!")
      this.handleLogin();
    }
  }



  render() {
    //Redirect if user is not logged in
    this.state.fireRedirect ? this.handleLogin : this.state.index;

    const bodyStyle = {
      backgroundImage: 'url(https://images.unsplash.com/photo-1421789497144-f50500b5fcf0?auto=format&fit=crop&w=1351&q=80)',
      backgroundSize: 'cover',
      height: '100vh'
    }


    return (
      <div>
        <NavBar />
        <header>

        <div className="row watchlist">


            <div className="col-8 mx-auto animated fadeIn">

              <h3 className="display-3">My Trips</h3>
              {this.props.users.watchlist.map(trip => (
                <Trip
                  key={trip.trip_id}
                  tripId={trip.trip_id}
                  country={trip.country}
                  currency={trip.currency}
                  locale={trip.locale}
                  originPlace={trip.origin}
                  destinationPlace={trip.destination}
                  outboundDate={trip.outbound_date}
                  inboundDate={trip.inbound_date}
                  budget={trip.budget}
                  watchlistUpdate={i =>
                    this.setState({ index: this.state.index + i })
                  }
                />))}

            </div>


          </div>

        </header>
        <div className="container">


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getWatchlist })(Watchlist)
);
