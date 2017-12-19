import React, {Component} from 'react';
import ResultsView from './../Search/SearchResults/ResultsView/ResultsView';

class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="homePage" >

                <div className="jumbotron jumbotron-fluid bg-info">
                        <div className="container">
                            <h1 className="display-3">Hello, world!</h1>
                            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                            <hr className="my-4" />
                            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                            <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                            </p>
                        </div>
                    </div>
                    <ResultsView />
            </div>
        )
    }
}
export default Home;