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
            budget:750
        };
        this.updateRange=this.updateRange.bind(this);
    }
    updateRange(e){
        this.setState({budget:parseInt(e.target.value)})
    }
    render() {
        let popularDestination = [{ key: 1, city: "London", destination: "LON", image: "https://images.unsplash.com/photo-1494922275507-58dc039ed337" }, { key: 2, city: "Paris", destination: "PAR", image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=334&q=80" }, { key: 3, city: "Rome", destination: "ROM", image: "https://images.unsplash.com/photo-1503970999490-4404449dc349?auto=format&fit=crop&w=669&q=80" }, { key: 4, city: "Buenos Aires", destination: "BUE", image: "https://images.unsplash.com/photo-1493837417577-baec364a53eb?auto=format&fit=crop&w=667&q=80" }, { key: 5, city: "Cape Town", destination: "CPT", image: "https://images.unsplash.com/photo-1495492429145-2c82ff875f67?auto=format&fit=crop&w=747&q=80" }, { key: 6, city: "New York City", destination: "NYC", image: "https://images.unsplash.com/photo-1503179008861-d1e2b41f8bec?auto=format&fit=crop&w=749&q=80" }, { key: 7, city: "Bangkok", destination: "BKK", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=647&q=80" }, { key: 8, city: "Hong Kong", destination: "HKG", image: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=750&q=80" }, { key: 9, city: "Sydney", destination: "SYD", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=750&q=80" }, { key: 10, city: "Grand Cayman", destination: "GCM", image: "https://images.unsplash.com/photo-1502208327471-d5dde4d78995?auto=format&fit=crop&w=750&q=80" }];

        let destinationArray = popularDestination.sort((a,b)=> b-a).map(
          i => (
            <PopularCard
              key={i.key}
              city={i.city}
              destination={i.destination}
              budget={this.state.budget}
              image={i.image}
            />
          )
        );

        
        return(
        <section className="container-fluid">
            <div className="row d-flex justify-content-center">
              <h1>Popular Destination under ${this.state.budget}</h1>
            </div>
            <div className="row d-flex justify-content-center py-3">
                <h5 className="mr-4">Update budget</h5>
                <input 
                    id="range" 
                    type="range"
                    min={100}
                    max={1000}
                    step={25}
                    value={this.state.budget}
                    onChange={this.updateRange}
                    />
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