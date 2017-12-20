import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getFlights} from './../../../ducks/flights_reducer';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currency: 'USD',
        locale: 'en-US',
        destinationPlace: 'Anywhere',
        originPlace: 'DFW',
        inboundPartialDate: '',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    // event.preventDefault();
    alert('Values entered: ' + JSON.stringify(this.state));
    this.props.getFlights(this.state);
  }


  render() {

    return (
      
        <form onSubmit={this.handleSubmit}>
          <div className="row search-inputs">

            <div className="col-lg-4 mb-2">
              <div className="input-group input-group-lg">
                <input type="number" name="budget" className="form-control" placeholder="Budget" onChange={this.handleChange} required></input>
              </div>
            </div>

            <div className="col-lg-4 mb-2">
              <div className="input-group input-group-lg">
                <input type="date" name="outboundPartialDate" className="form-control" placeholder="Date" onChange={this.handleChange} required></input>
              </div>
            </div>

            <div className="col-lg-4 mb-2">
              <Link to="/searchResults"><button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit} >Find your flight</button></Link>
            </div>

          </div>
        </form>

    )
  }

}
const mapStateToProps = state => state

export default connect(mapStateToProps, {getFlights})(Search);
