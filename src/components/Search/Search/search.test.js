import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.js';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store";

const flights = require("../../../ducks/flights_reducer.js");
const search = require("./Search.js");

  
describe('search', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Provider store={store}>
                    <Search/>
                </Provider>
            </BrowserRouter>, div);
    })
},
describe('response should be an array', () => {
    afterEach( () => {
      search.handleSubmit = {
          country: 'US',
          currency: 'USD',
          locale: 'en-US',
          originPlace: 'DFW',
          destinationPlace: 'Anywhere',
          outboundPartialDate: '',
          inboundPartialDate: '',
          budget: 300
        }
    });
    test('redux flight values should exist', () => {
        expect(this.props.flights).not.toBe(null);
    })
})




);


    
