import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import {connect} from 'react-redux';
import flights, {getFlights, filterFlights} from './../../../../ducks/flights_reducer';
import './UpdateSearch.css';

class UpdateSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.flights.searchTerms.country,
            currency: this.props.flights.searchTerms.currency,
            locale: this.props.flights.searchTerms.locale,
            originPlace: this.props.flights.searchTerms.originPlace,
            destinationPlace: this.props.flights.searchTerms.destinationPlace,
            outboundPartialDate: this.props.flights.searchTerms.outboundPartialDate,
            inboundPartialDate: this.props.flights.searchTerms.inboundPartialDate,
            budget: this.props.flights.searchTerms.budget
        }
        this.handleBudgetUpdate = this.handleBudgetUpdate.bind(this);
        this.handleCountrySelect = this.handleCountrySelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        
    }
    handleBudgetUpdate(val) {
        this.setState({
            budget: val
        })
    }
    handleCountrySelect(val) {
        this.setState({
            destinationPlace: val
        })
    }

    handleSubmit() {
        var flightProps = this.props.flights.searchTerms;
    
        if(flightProps.destinationPlace == this.state.destinationPlace && flightProps.budget !== this.state.budget) {
            this.props.getFlights(this.state)
        } else if (flightProps.destinationPlace !== this.state.destinationPlace && flightProps.budget == this.state.budget) {
            this.props.filterFlights(this.state.destinationPlace)
        }
        else if (flightProps.destinationPlace !== this.state.destinationPlace && flightProps.budget !== this.state.budget) {
            this.props.getFlights(this.state);
            // this.props.history.push('/searchResults');
        }

    }

    render() {
        var countriesOptions = this.props.flights.flights.map((cur, ind) => {
            return <option value={cur.destinationObj.CountryName} key={ind} >{cur.destinationObj.CountryName}</option>
        })
         
        return(
            <div className="updateSearchContainer" >

                <select defaultValue={`Choose a country`} onChange={(e) => this.handleCountrySelect(e.target.value)}>
                <option value="Anywhere" >Anywhere</option>
                    {countriesOptions}
                </select>
                <Collapsible trigger="Select a new budget" >
                    <div className="priceSelector" >
                        <input type="range" min="1" max="10000" className="slider" id="myRange" onChange={(e) => this.handleBudgetUpdate(e.target.value)} />
                    </div>
                </Collapsible>
                <button onClick={this.handleSubmit} >Apply Filters</button>
                <button onClick={() => this.props.getFlights(this.props.flights.searchTerms)} >Clear Filters</button>
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {getFlights, filterFlights})(UpdateSearch);

// country: "US",
//       currency: "USD",
//       locale: "en-US",
//       originPlace: this.props.users.userLocation.airport.PlaceName,
//       destinationPlace: "Anywhere",
//       outboundPartialDate: "",
//       inboundPartialDate: "",
//       budget: null