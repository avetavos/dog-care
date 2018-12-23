import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "../../css/App.css";

export class Navbar extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.onHandleSideNav();
  };

  onHandleSideNav = () => {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.getInstance(elem);
    instance.close();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authNavbar = (
      <React.Fragment>
        <div class="navbar-fixed">
          <nav>
            <div className="nav-wrapper pink">
              <div className="container">
                <Link to="/dogs" className="brand-logo white-text">
                  Dog Care
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>
                    <Link to={`/profile/${user.id}`} className="white-text">
                      <i className="material-icons left">person</i>{" "}
                      {user.fullname}
                    </Link>
                  </li>
                  <li>
                    <Link to="/dogs" className="white-text">
                      <i className="material-icons left">pets</i> สุนัขของคุณ
                    </Link>
                  </li>
                  <li className="pink darken-2">
                    <a
                      href="#"
                      className="white-text"
                      onClick={this.onLogoutClick}>
                      <i className="material-icons left">power_settings_new</i>
                      ออกจากระบบ
                    </a>
                  </li>
                </ul>
                <a
                  href="#"
                  data-target="slide-out"
                  className="sidenav-trigger white-text"
                  style={{ margin: 0 }}>
                  <i className="material-icons">menu</i>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <ul id="slide-out" className="sidenav">
            <li>
              <div className="user-view">
                <div className="background">
                  <img src="https://webhostssd.com/wp-content/uploads/2016/06/material-design-starlyn-300x225.png" />
                </div>
                <a href="!#">
                  <img className="circle" src={user.avatar} />
                </a>
                <a href="!#">
                  <span className="white-text name">{user.fullname}</span>
                </a>
                <a href="!#">
                  <span className="white-text email">{user.email}</span>
                </a>
              </div>
            </li>
            <li>
              <Link to={`/profile/${user.id}`} onClick={this.onHandleSideNav}>
                <i className="material-icons left">person</i> {user.fullname}
              </Link>
            </li>
            <li>
              <Link to="/dogs" onClick={this.onHandleSideNav}>
                <i className="material-icons left">pets</i> สุนัขของคุณ
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="red-text"
                onClick={this.onLogoutClick}
                data-target="slide-out">
                <i className="material-icons left red-text">
                  power_settings_new
                </i>{" "}
                ออกจากระบบ
              </a>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );

    const guestNavbar = (
      <React.Fragment>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper pink">
              <div className="container">
                <Link to="/" className="brand-logo white-text">
                  Dog Care
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>
                    <Link to="/login" className="white-text">
                      <i className="material-icons left">exit_to_app</i>
                      ลงชื่อเข้าใช้
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="white-text">
                      <i className="material-icons left">person_add</i>{" "}
                      สมัครสมาชิก
                    </Link>
                  </li>
                </ul>
                <a
                  href="#"
                  data-target="slide-out"
                  className="sidenav-trigger white-text"
                  style={{ margin: 0 }}>
                  <i className="material-icons">menu</i>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <ul id="slide-out" className="sidenav">
            <li>
              <div className="user-view">
                <div className="background">
                  <img src="https://webhostssd.com/wp-content/uploads/2016/06/material-design-starlyn-300x225.png" />
                </div>
                <br />
                <br />
                <br />
              </div>
            </li>
            <li>
              <Link to="/" onClick={this.onHandleSideNav}>
                <i className="material-icons left">home</i> หน้าหลัก
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={this.onHandleSideNav}>
                <i className="material-icons left">exit_to_app</i> ลงชื่อเข้าใช้
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={this.onHandleSideNav}>
                <i className="material-icons left">person_add</i> สมัครสมาชิก
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {isAuthenticated ? authNavbar : guestNavbar}
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const stateToProps = state => ({
  auth: state.auth
});

export default connect(
  stateToProps,
  { logoutUser }
)(Navbar);
