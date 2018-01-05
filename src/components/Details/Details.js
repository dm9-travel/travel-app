import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import moment from 'moment';

import users, { requestUser, deleteTrip } from "../../ducks/user_reducer";
import flights, { addToWatchlist } from "../../ducks/flights_reducer";
import NavBar from "../Nav/NavBar/NavBar";
import "./Details.css";


console.log('PIXKEY: ', process.env.PIXABAYKEY);

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: {},
      buttonState: false,
      tripId: null,
      redirect: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.bookFlight = this.bookFlight.bind(this);

  }
  handleClick() {
    this.props
      .addToWatchlist(this.state.listItem)
      .then(trip =>
        this.setState({
          tripId: trip.value.data[0].trip_id,
          buttonState: true
        })
      );
  }
  handleRemove() {
    this.props
      .deleteTrip(this.state.tripId)
      .then(this.setState({ buttonState: false }));
  }
  componentDidMount() {
    if (this.props.users.currentUser) {
      console.log("hello here");
      this.setState({
        listItem: {
          user_id: this.props.users.currentUser.user_id,
          country: this.props.flights.selectedFlight.countryName,
          currency: this.props.flights.searchTerms.currency,
          locale: this.props.flights.searchTerms.locale,
          origin: this.props.users.userLocation.airport.PlaceId,
          destination: this.props.flights.selectedFlight.IATAcode,
          outbound_date: this.props.flights.selectedFlight.outboundDate,
          inbound_date: this.props.flights.searchTerms.inboundPartialDate,
          budget: this.props.users.budget
        }
      });
    };

  }

  bookFlight() {
    var redirector = `http://partners.api.skyscanner.net/apiservices/referral/v1.0/US/USD/en-US/${this.props.users.userLocation.airport.PlaceId}/${this.props.flights.selectedFlight.IATAcode}/${moment(this.props.flights.selectedFlight.outboundDate).format('YYYY-MM-DD')}/${moment(this.props.flights.searchTerms.inboundPartialDate).format('YYYY-MM-DD')}?apiKey=so91596320528724`;
    // console.log(redirector);

    window.location.href = redirector;
  }

  render() {
    let {
      originPlace,
      countryName,
      outboundDate,
      price,
      direct,
      IATAcode,
      cityName,
      airline,
      name,
      skyCode,
      originId,
      time,
      imageUrl,
      duration
    } = this.props.flights.selectedFlight;

    const jumbotronStyle = {
      backgroundImage: 'url(' + imageUrl + ')'
    };

    return (
      <div>
        <NavBar />

        <div className="details-main">
          <header className="d-flex flex-column justify-content-center align-items-center details-jumbotron" style={jumbotronStyle}>
            <h1 className="flight-info display-3 text-white">
              <span>{'DFW' || this.state.listItem.origin}</span>
              <i className="fa fa-arrow-right animated shake" aria-hidden="true" />
              <span>{IATAcode}</span>
            </h1>
            <h1 className="display-4 text-white">${price}</h1>

            <div className="row mt-3">
              {!this.state.buttonState && <button type="button" className="btn btn-primary btn-lg mr-3" onClick={this.handleClick}>
                Add To Watchlist
                </button>}
              {this.state.buttonState && <button type="button" className="btn btn-primary btn-lg mr-3" onClick={this.handleRemove}>
                Remove From Watchlist
                </button>}
              <button type="button" className="btn btn-primary btn-lg ml-3" onClick={this.bookFlight}>
                Book Now!
              </button>
            </div>
          </header>


          <div className="container flight-details">
            <div className="row">
              <div className="col-10 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-left">Departing</h3>
                  </div>
                  <div className="card-body d-flex flex-wrap">
                    <div className="d-flex flex-row w-100 justify-content-start">
                      <h4>{airline}</h4>
                    </div>
                    <div className="d-flex flex-row w-50 justify-content-start">
                      <i className="fa fa-plane fa-3x" aria-hidden="true" />
                      <div className="some-margin d-flex flex-column align-items-start">
                        <h6>From</h6>
                        <h4>{originPlace}</h4>
                      </div>
                    </div>
                    <div className="d-flex flex-row w-50 justify-content-start">
                      <i className="fa fa-plane fa-3x fa-rotate-90" aria-hidden="true" />
                      <div className="some-margin  d-flex flex-column align-items-start">
                        <h6>To</h6>
                        <h4>{cityName}</h4>
                      </div>
                    </div>
                    <div className="d-flex flex-row w-100 justify-content-start flex-wrap">
                      <div className="d-flex flex-row w-50 justify-content-start flex-wrap">
                        <i className="fa fa-calendar fa-3x" aria-hidden="true" />
                        <div className="d-flex flex-column align-items-start some-margin">
                          <h6>Departing</h6>
                          <h4>
                            {moment(outboundDate).format("ddd, MMMM Do")} at {moment("2013-02-08T" + time).format("h:mm a")}
                          </h4>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-start w-50">
                        <i className="fa fa-clock-o fa-3x" aria-hidden="true" />
                        <div className="d-flex flex-column align-items-start some-margin">
                          <h6>Duration</h6>
                          <h4>{duration}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </div>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { addToWatchlist, requestUser, deleteTrip })(Details));
