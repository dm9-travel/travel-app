import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

// Import components
import Header from './../Nav/Header/Header';
import ResultsView from './../Search/SearchResults/ResultsView/ResultsView';


class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="homePage" >
                
                <Header />
                <div>
                    <Link to="/searchResults" ><button>Search results</button></Link>
                </div>
            </div>
        )
    }
}
export default withRouter(Home);
