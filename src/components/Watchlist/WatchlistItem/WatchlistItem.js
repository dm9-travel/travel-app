import React, { Component } from 'react';
import axios from 'axios';

class WatchlistItem extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        
    }

    render() {
        let cardStyle={width:"90%",margin:"1rem"};
        let rowStyle={width:"100%"}
        return <div className="card" style={cardStyle}>
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <h4 className="card-title">Dallas To Los Angeles</h4>
                <h6 className="card-subtitle text-muted">$150.00</h6>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center flex-wrap">
                <div className="d-flex flex-row justify-content-between" style={rowStyle}>
                  <span className="card-text">Sat, Feb 23</span>
                  <span className="card-text">DFW-LAX</span>
                </div>
                <div className="d-flex flex-row justify-content-between" style={rowStyle}>
                  <span className="card-text">Tues, Feb 25</span>
                  <span className="card-text">LAX-DFW</span>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-start">
                <a href="#" className="card-link">Details</a>
                <a href="#" className="card-link">Delete</a>
              </div>
            </div>
          </div>;
    }
}

export default WatchlistItem;