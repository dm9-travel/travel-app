import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.js';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store";



  
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
describe('state should update', () => {
    beforeEach( () => {
        const newSearch = new Search();
        newSearch.handleChange({target: {name: 'budget', value: '500'}});
        
    })
    expect(newSearch.state.budget).toEqual(500);
}),
describe('state should update', () => {
    beforeEach( () => {
        const newSearch = new Search();
        newSearch.handleChange({target: {name: 'country', value: 'EU'}});
        
    })
    expect(newSearch.state.country).toEqual('EU');
}),
describe('state should update', () => {
    beforeEach( () => {
        const newSearch = new Search();
        newSearch.handleChange({target: {name: 'locale', value: 'en-EU'}});
        
    })
    expect(newSearch.state.locale).toEqual('en-EU');
}),
describe('state should update', () => {
    beforeEach( () => {
        const newSearch = new Search();
        newSearch.handleChange({target: {name: 'currency', value: 'Euros'}});
        
    })
    expect(newSearch.state.currency).toEqual('Euros');
})
);


    
