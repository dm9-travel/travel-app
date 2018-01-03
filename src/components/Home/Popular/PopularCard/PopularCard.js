import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

import { sendBudget } from "../../../../ducks/user_reducer";
import { getFlights, setSearch } from "../../../../ducks/flights_reducer";

import './PopularCard.css'

class PopularCard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            search:{
                country: "US", 
                currency: "USD", 
                locale: "en-US", 
                originPlace: this.props.users.userLocation.airport.PlaceName, 
                destinationPlace: "ATL", 
                outboundPartialDate: moment().format("YYYY-MM"), 
                inboundPartialDate: "", 
                budget: this.props.budget 
        },
        price:0

        };
    }
    componentDidMount(){
        this.props
            .getFlights(this.state.search)
            .then(flights=>{
                console.log("array:",flights.value);
                this.setState({price:flights.value.reduce((acc, curr) =>{return Math.max(curr.MinPrice, acc);}, 0)});
            });
    }
    render() {
        return (
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card m-2">
                  <img className="card-img-top" src="https://picsum.photos/200/150?random" alt="Card image cap" />
                  <h4 className="card-text card-price float-right">
                    ${this.state.price}
                  </h4>
                  <div className="card-body d-flex flex-column flex-wrap align-items-start">
                    <span>Dallas-Fort Worth to Salt Lake City</span>
                    <span>Fri Jan 12</span>
                  </div>
                </div>
              </div>
        );
    }
}

const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps, { getFlights, setSearch, sendBudget })(PopularCard));