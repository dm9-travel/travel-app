import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {sendBudget} from "../../../ducks/user_reducer";
import { getFlights, setSearch } from "../../../ducks/flights_reducer";
import PopularCard from './PopularCard/PopularCard';
import './Popular.css';

class Popular extends Component {
    constructor(props){
        super(props);
        this.state={
            budget:500
        };
    }
    render() {
        
        let destinationArray=[
            {key:1,price:99.99,city:"Atlanta",destination:"ATL"},
            {key:2,price:125.00},
            {key:3,price:44.99},
            {key:4,price:105.99},
            {key:5,price:165.00}   
        ].map(i=><PopularCard key={i.key} price={i.price} budget={this.state.budget}/>)
        
        return(
        <section className="container-fluid">
            <div className="row d-flex justify-content-center">
              <h1>Popular Destination</h1>
            </div>
            <div className="row">
                {destinationArray}
            </div>
        </section>
    );
    }
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps, { getFlights, setSearch, sendBudget })(Popular));