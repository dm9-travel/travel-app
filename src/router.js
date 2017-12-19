import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

//components to be rendered
import ResultsView from './components/Search/SearchResults/ResultsView/ResultsView.js';
import Home from './components/Home/Home.js';
import Details from './components/Details/Details.js';
import Watchlist from './components/Watchlist/Watchlist.js'

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path = '/' component={Home} />
      <Route path = '/searchresults' component={ResultsView} />
      <Route path = '/details' component={Details} />
      <Route path = '/watchlist' component={Watchlist} />
    </Switch>
  </BrowserRouter>
)
