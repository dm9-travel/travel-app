import React from 'react';
import {Switch, Route} from 'react-router-dom';

//components to be rendered
import ResultsView from './components/Search/SearchResults/ResultsView/ResultsView.js';
import Home from './components/Home/Home.js';
import Details from './components/Details/Details.js';
import Watchlist from './components/Watchlist/Watchlist.js'

export default (
  
    <Switch>
      <Route exact path = '/' component={Home} />
      <Route path = '/searchResults' component={ResultsView} />
      <Route path = '/details' component={Details} />
      <Route path = '/watchlist' component={Watchlist} />
    </Switch>
  
)
