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
});
    
