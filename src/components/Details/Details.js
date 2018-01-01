import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from 'moment';

import users, { requestUser } from "../../ducks/user_reducer";
import flights, { addToWatchlist } from "../../ducks/flights_reducer";
import NavBar from "../Nav/NavBar/NavBar";
import "./Details.css";

class Details extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

    this.handleClick=this.handleClick.bind(this);
  }
  handleClick() {

    this.props.addToWatchlist(this.state);
  }
  componentDidMount(){
    if (this.props.users.currentUser[0]){
      this.setState({
        user_id: this.props.users.currentUser[0].user_id,
        country: this.props.flights.selectedFlight.countryName,
        currency: this.props.flights.searchTerms.currency,
        locale: this.props.flights.searchTerms.locale,
        origin: this.props.users.userLocation.airport.PlaceId,
        destination: this.props.flights.selectedFlight.IATAcode,
        outbound_date: this.props.flights.selectedFlight.outboundDate,
        inbound_date: this.props.flights.searchTerms.inboundPartialDate,
        budget: this.props.users.budget
      })
    };
    
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

    return (
      <div>
        <NavBar />
        <div className="details-main">
              <header className="d-flex flex-column justify-content-center align-items-center details-jumbotron">
                <h1 className="display-3 text-white">
                  <span>DFW</span>
                  <i className="fa fa-arrow-right" aria-hidden="true" />
                  <span>{IATAcode}</span>
                </h1>
                <h1 className="display-6 text-white">${price}</h1>
                <button type="button" class="btn btn-success" onClick={this.handleClick}>
                  Add To Watchlist
                </button>
              </header>
              <main>
                <section className="card">
                  <div class="card-header">
                    <h3 className="text-left">Departing</h3>
                  </div>
                  <div class="card-body d-flex flex-wrap">
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
                        <i class="fa fa-clock-o fa-3x" aria-hidden="true" />
                        <div className="d-flex flex-column align-items-start some-margin">
                          <h6>Duration</h6>
                          <h4>{duration}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
        </div>
      </div>
)
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { addToWatchlist, requestUser })(Details));
