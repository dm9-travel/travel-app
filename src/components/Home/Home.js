import React, {Component} from 'react';
import ResultsView from './../Search/SearchResults/ResultsView/ResultsView';
import Header from './../Nav/Header/Header';
import {Link} from 'react-router-dom';

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
export default Home;
