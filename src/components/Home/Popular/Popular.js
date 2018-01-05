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
            budget:1000
        };
        this.updateRange=this.updateRange.bind(this);
    }
    updateRange(e){
        this.setState({budget:parseInt(e.target.value)})
    }
    render() {  
        return (
        <section className="container">
            <div className="row pt-5 pb-4">
              <div className="w-80">
                <h1 className="display-6">Explore the World</h1>
                <p className="lead">
                  This is a simple hero unit, a jumbotron component for
                  calling extra attention to featured content.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-7 pl-0">
                <PopularCard city={"New York"} destination={"NYC"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1479660095429-2cf4e1360472?auto=format&fit=crop&w=951&q=80"} />
              </div>
              <div className="col-sm-5 pl-0 pr-0">
                <PopularCard city={"Paris"} destination={"PAR"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&w=950&q=80"} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-4 pl-0">
                <PopularCard city={"Tokyo"} destination={"HND"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=926&q=80"} />
              </div>
              <div className="col-sm-4 pl-0">
                <PopularCard city={"Rome"} destination={"ROM"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1504802309034-73ef35653660?auto=format&fit=crop&w=767&q=80"} />
              </div>
              <div className="col-sm-4 pl-0">
                <PopularCard city={"Shanghai"} destination={"PVG"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=950&q=80"} />
              </div>
            </div>
            <div className="row mt-3">
              {/* Los Angeles Card */}
              <div className="col-sm-6 pl-0">
                <PopularCard city={"Los Angeles"} destination={"LAX"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1650&q=80"} />
              </div>
              {/* London Card  */}
              <div className="col-sm-6 pl-0 pr-0">
                <PopularCard city={"London"} destination={"LON"} budget={this.state.budget} image={"https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?auto=format&fit=crop&w=1049&q=80"} />
              </div>
            </div>
      </section>
      )}
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps, { getFlights, setSearch, sendBudget })(Popular));
