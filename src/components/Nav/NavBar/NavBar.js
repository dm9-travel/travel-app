import React, { Component } from 'react';
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { requestUser, getWatchlist } from '../../../ducks/user_reducer';
import logo from './logo.svg';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_id: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

   handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
    this.props.getWatchlist(this.props.currentUser[0].user_id);
  }

  handleLogout() {
    window.location.href = 'http://localhost:3001/api/logout';
  }

  componentDidMount() {
    this.props.requestUser()

    axios.get('/api/me').then((response) => {
    console.log(response.data[0].auth_id);
    this.setState({auth_id: response.data[0].auth_id})
        });
    
    
  }


  render() {
   console.log(this.state.auth_id);
    let username = this.props.users.currentUser.user_name
    let navBarStyle = 'navbar sticky-top navbar-expand-lg navbar-light';
    let containerType = 'container';
    let greeting = username ? <h5>Welcome {this.props.users.currentUser.user_name}!</h5> : null
    let renderAuth = !username



    if (this.props.location.pathname !== '/') {
      containerType = 'container-fluid';
      navBarStyle = 'navbar sticky-top navbar-expand-lg navbar-dark bg-dark';
    }

    // console.log(this.props.users.currentUser.user_name);

    return (
      <nav className={navBarStyle}>
        <div className={containerType}>
          <img src={logo} className="logo" alt="logo" />
          <Link to="/" className="navbar-brand">Wayz</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {greeting}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-uppercase">
              <li className="nav-item mr-4">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item mr-4">
                <Link className="nav-link" to="/watchlist">Watchlist</Link>
              </li>

                {renderAuth}

                {this.state.auth_id === null
                ?
                <li className="nav-item">
                  <button className="btn btn-outline-primary log" onClick={this.handleLogin}>LOG IN</button>
                </li>
                :
                <li className="nav-item">
                  <img src={this.props.picture} className="rounded-circle mr-4" height="40"></img>
                  <button className="btn btn-outline-danger log" onClick={this.handleLogout}>LOG OUT</button>
                </li>
              }

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

export default withRouter(connect(mapStateToProps, { requestUser, getWatchlist })(NavBar));
