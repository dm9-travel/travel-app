import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import ResultsView from './components/Search/SearchResults/ResultsView/ResultsView';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/searchResults" component={ResultsView} />    
    </Switch>
)