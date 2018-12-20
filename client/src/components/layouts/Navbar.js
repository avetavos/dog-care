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
        <nav>
          <div className="nav-wrapper pink">
            <div className="container">
              <Link to="/dogs" className="brand-logo white-text">
                Dog Care
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to={`/profile/${user.id}`} className="white-text">
                    {user.fullname}
                  </Link>
                </li>
                <li>
                  <Link to="/dogs" className="white-text">
                    สุนัขของคุณ
                  </Link>
                </li>
                <li>
                  <a href="#" className="red-text" onClick={this.onLogoutClick}>
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
                {user.fullname}
              </Link>
            </li>
            <li>
              <Link to="/dogs" onClick={this.onHandleSideNav}>
                สุนัขของคุณ
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="red-text"
                onClick={this.onLogoutClick}
                data-target="slide-out">
                ออกจากระบบ
              </a>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );

    const guestNavbar = (
      <React.Fragment>
        <nav>
          <div className="nav-wrapper white">
            <div className="container">
              <Link to="/" className="brand-logo pink-text">
                Dog Care
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/login">ลงชื่อเข้าใช้</Link>
                </li>
                <li>
                  <Link to="/register">สมัครสมาชิก</Link>
                </li>
              </ul>
              <a
                href="#"
                data-target="slide-out"
                className="sidenav-trigger pink-text"
                style={{ margin: 0 }}>
                <i className="material-icons">menu</i>
              </a>
            </div>
          </div>
        </nav>
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
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={this.onHandleSideNav}>
                ลงชื่อเข้าใช้
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={this.onHandleSideNav}>
                สมัครสมาชิก
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
