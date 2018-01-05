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
        price:0,
        flightList:[]
        };
        this.search ={
                country: "US", 
                currency: "USD", 
                locale: "en-US", 
                originPlace: "DFW", 
                destinationPlace: this.props.destination, 
                outboundPartialDate: moment().format("YYYY-MM"), 
                inboundPartialDate: "", 
                budget: this.props.budget 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        this.props.getFlights(this.search);
        this.props.setSearch(this.search);
        this.props.sendBudget(this.search.budget);
        this.props.history.push("/searchResults");
    }
    componentDidMount(){
        this.props
            .getFlights(this.search)
            .then(flights=>{
                this.setState({
                    price:flights.value.reduce((acc, curr) =>{return Math.min(curr.MinPrice, acc);},this.props.budget),
                    flightList:flights.value
                });
            });
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.budget !== this.props.budget){
            this.search.budget = this.props.budget;
            this.props
                .getFlights(this.search)
                .then(flights => {
                    this.setState({
                        price: flights.value.reduce((acc, curr) => {
                        return Math.min(curr.MinPrice, acc);
                        }, this.props.budget),
                flightList: flights.value
              });
            });
        }
    }
    render() {

        return (
          // <div className="col-12 col-sm-6 col-md-4">
          //     <div className="card">
          //         <img className="card-img-top" src={this.props.image} alt="Card image cap" />
          //         {this.state.flightList.length > 0 ?
          //             <button className="btn btn-warning btn-lg btn-block card-price" onClick={this.handleSubmit}>
          //                 See Flights
          //             </button> :
          //             <button className="btn btn-danger btn-lg btn-block card-price">
          //                 No Flights
          //             </button>}
          //         <div className="card-body d-flex flex-column flex-wrap align-items-start">
          //         <span>Dallas-Fort Worth to {this.props.city}</span>
          //         {this.state.flightList.length > 0 ?
          //             <span>Flights starting at ${this.state.price}</span> :
          //             <span>No flights at this budget for{moment().format("MMMM")}</span>}
          //         </div>
          //     </div>
          // </div>
          <div className="card bg-dark text-white h-100">
            <img className="card-img" src={this.props.image} alt="Card image" />
            <div className="card-img-overlay d-flex flex-column flex-wrap justify-content-center align-items-center">
              <h1 className="card-title text-left">{this.props.city}</h1>
                {this.state.flightList.length > 0 ?
                    <button className="btn btn-warning btn-block custom-button" onClick={this.handleSubmit}>
                        See Flights
                    </button> :
                    <button className="btn btn-danger btn-block custom-button ">
                        No Flights
                    </button>}
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps, { getFlights, setSearch, sendBudget })(PopularCard));