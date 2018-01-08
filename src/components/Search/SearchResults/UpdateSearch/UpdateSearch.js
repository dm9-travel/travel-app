import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import flights, { getFlights, filterFlights, unfilterFlights } from './../../../../ducks/flights_reducer';

import Slider, { createSliderWithTooltip } from 'rc-slider';


import 'rc-slider/assets/index.css';
import './UpdateSearch.css';
const SliderWithTooltip = createSliderWithTooltip(Slider);

const countries = require('./Countries.json');

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
        this.handleClear = this.handleClear.bind(this)
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    handleBudgetUpdate(val) {
        console.log('BUDGET: ', val);
        this.setState({
            budget: val
        })
    }
    handleCountrySelect(val) {

        this.setState({ destinationPlace: val })
        this.handleSubmit();

    }

    handleSubmit() {
        var flightProps = this.props.flights.searchTerms;
        var countriesList = countries;
        var selectedCountry = countriesList.find(x => x.name == this.state.destinationPlace)
        // if(flightProps.destinationPlace == this.state.destinationPlace && flightProps.budget !== this.state.budget) {
        //     this.props.getFlights(this.state)
        // } else if (flightProps.destinationPlace !== this.state.destinationPlace && flightProps.budget == this.state.budget) {
        //     this.props.filterFlights(this.state.destinationPlace)
        // }
        // else if (flightProps.destinationPlace !== this.state.destinationPlace && flightProps.budget !== this.state.budget) {

        //     this.setState({
        //         destinationPlace: selectedCountry.code
        //     }, this.props.getFlights(this.state))

        //     // this.props.history.push('/searchResults');
        // }  
        if (flightProps.budget != this.state.budget) {
            if (this.state.destinationPlace == "Anywhere") {
                this.props.getFlights(this.state)
            } else {

                var searchObj = this.state;
                searchObj.destinationPlace = selectedCountry.code;
                this.props.getFlights(searchObj);
            }
        } else {
            if (this.state.destinationPlace == "Anywhere") {
                alert('no changes to search or results')
            } else {
                this.props.filterFlights(this.state.destinationPlace)
            }
        }

    }
    handleClear() {
        var flightProps = this.props.flights.searchTerms;
        var countriesList = countries;
        var selectedCountry = countriesList.find(x => x.name == this.state.destinationPlace)

        if (flightProps.budget != this.state.budget) {
            this.props.getFlights(flightProps)
            this.setState({ budget: this.props.flights.searchTerms.budget })
        }
        else {
            this.props.unfilterFlights(this.props.flights.flights);
        }
    }
    // handleUpdateSearch() {
    //     this.setState({
    //         destinationPlace: "Anywhere"
    //     }, this.props.getFlights(this.state))
    // }
            
    currencyFormatter(v) {
        return `$${v}`;
      }

    render() {
        var countriesOptions = this.props.flights.flights.map((cur, ind) => {
            return <option value={cur.destinationObj.CountryName} key={ind} >{cur.destinationObj.CountryName}</option>
        })

        const marks = {
            0: '$0',
            500: '$500',
            1000: '$1000',
            1500: '$1500',
        }

        return (
            <div className="updateSearchContainer" >



                <div className="container budget-slider">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-5 text-left">
                    <span className="pr-lg-3">LOCATION</span>
                    <select defaultValue={`Choose a country`} onChange={(e) => this.handleCountrySelect(e.target.value)}>
                    <option value="Anywhere">Anywhere</option>
                    {countriesOptions}
                    </select>
                    </div>
                    <div className="col-lg-2 text-left pl-0">
                    MY BUDGET
                    </div>
                    <div className="col-lg-3 pl-0">
                        <SliderWithTooltip
                            defaultValue={this.state.budget}
                            min={0} max={1500}
                            tipFormatter={this.currencyFormatter}
                            tipProps={ {placement: 'top', prefixCls: 'rc-slider-tooltip'} }
                            // marks={marks}
                            // dots
                            step={50}
                            onChange={this.handleBudgetUpdate}
                            onAfterChange={this.handleSubmit}
                        />
                        
                    </div>
                    <div className="col-lg-2 pl-0 text-right">
                        <button className="btn btn-outline-dark" onClick={this.handleClear} >Clear Filters</button>
                    </div>
                </div>
                </div>


                {/* <div className="container">
                <div className="row">
                    <div className="col-sm">
                    YOUR BUDGET
                    </div>
                    <div className="col-sm">
                        <SliderWithTooltip
                            defaultValue={this.state.budget}
                            min={0} max={1500}
                            tipFormatter={this.currencyFormatter}
                            tipProps={{ overlayClassName: 'foo' }}
                            marks={marks}
                            onChange={this.handleBudgetUpdate}
                            onAfterChange={this.handleSubmit}
                        />
                    </div>
                </div>
                </div> */}

                
{/* 
                <div>

                <select defaultValue={`Choose a country`} onChange={(e) => this.handleCountrySelect(e.target.value)}>
                    <option value="Anywhere">Anywhere</option>
                    {countriesOptions}
                </select>
                <Collapsible trigger="Select a new budget" >
                    <div className="priceSelector" >
                        <input type="range" min="1" max="1500" className="slider" id="myRange" ref={ref => this.budgetSelector} value={this.state.budget} onChange={(e) => this.handleBudgetUpdate(e.target.value)} />
                    </div>
                </Collapsible>
                <button className="btn btn-outline-dark" onClick={this.handleSubmit} >Apply Filters</button>
                <button className="btn btn-outline-dark" onClick={this.handleClear} >Clear Filters</button>

                </div> */}

            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getFlights, filterFlights, unfilterFlights })(UpdateSearch);

// country: "US",
//       currency: "USD",
//       locale: "en-US",
//       originPlace: this.props.users.userLocation.airport.PlaceName,
//       destinationPlace: "Anywhere",
//       outboundPartialDate: "",
//       inboundPartialDate: "",
//       budget: null