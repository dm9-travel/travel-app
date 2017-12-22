import React, {Component} from 'react';
import {connect} from 'react-redux';
import './UpdateSearch.css';

class UpdateSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var countriesOptions = this.props.flights.flights.map((cur, ind) => {
            <option value={cur.destinationObj.CountryName} >{cur.destinationObj.CountryName}</option>
        })
        return(
            <div className="updateSearchContainer" >
                <select>
                    {countriesOptions}
                </select>
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(UpdateSearch);