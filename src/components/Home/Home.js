import React, { Component } from "react";
import ResultsView from "./../Search/SearchResults/ResultsView/ResultsView";
import Header from "./../Nav/Header/Header";
import axios from "axios";
import { lockUser } from "../../ducks/user_reducer.js";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  async componentDidMount() {
    await axios
      .get("/api/me")
      .then(response => {
        if (response) {
          this.setState({ user: response.data[0] });
        }
      })
      .catch(err => err);

    this.props.lockUser(this.state.user);
  }
  render() {
    return (
      <div className="homePage">
        <Header />
        <div>
          <Link to="/searchResults">
            <button>Search results</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const connected = connect(mapStateToProps, { lockUser })(Home);
const RoutedContainer = withRouter(connected);
export default RoutedContainer;
