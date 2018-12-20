import React, { Component } from "react";
import logo from "../../images/favicon.png";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../css/Login.css";
import TextInput from "../common/TextInput";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dogs");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <form
          className="form-signin center col s12"
          onSubmit={this.onSubmit}
          noValidate>
          <img src={logo} alt="loho" width="150" height="150" />
          <h1>ลงชื่อเข้าใช้</h1>
          <TextInput
            id="username"
            label="ชื่อบัญชีผู้ใช้"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            error={errors.username}
            style={{ left: "0" }}
          />
          <TextInput
            id="password"
            label="รหัสผ่าน"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            style={{ left: "0" }}
          />
          <div className="col s12 center">
            <button
              type="submit"
              className="waves-effect waves-light btn-large pink">
              ลงชื่อเข้าใช้
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const stateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  stateToProps,
  { loginUser }
)(Login);
