import React, {Component} from 'react';
import ResultsView from './../Search/SearchResults/ResultsView/ResultsView';
import Header from './../Nav/Header/Header';

class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="homePage" >

               <Header />
                <ResultsView />
            </div>
        )
    }
}
export default Home;