import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/api/login";
  }

  render() {
    let navBarStyle = "navbar sticky-top navbar-expand-lg navbar-light";
    let containerType = "container";

    if (this.props.location.pathname !== "/") {
      console.log("Not home page");
      containerType = "container-fluid";
      navBarStyle = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
    }

    console.log("I am NavBar at pathname: ", this.props.location.pathname);

    return (
      <nav className={navBarStyle}>
        <div className={containerType}>
          <img src={logo} className="logo" alt="logo" />
          <Link to="/" className="navbar-brand">
            Wayz
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-uppercase">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watchlist">
                  Watchlist
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  onClick={this.handleLogin}
                  className="btn btn-outline-primary text-uppercase ml-5"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
