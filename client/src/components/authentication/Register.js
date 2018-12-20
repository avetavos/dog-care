import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";

export class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    fullname: "",
    address: "",
    phone: "",
    email: "",
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

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      fullname: this.state.fullname,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container-register container">
        <div className="row">
          <div className="col s12 center">
            <h1>สมัครสมาชิก</h1>
          </div>
          <form className="col s12" onSubmit={this.onSubmit} noValidate>
            <TextInput
              id="username"
              label="ชื่อบัญชีผู้ใช้"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <TextInput
              id="password"
              label="รหัสผ่าน"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextInput
              id="password2"
              label="ยืนยันรหัสผ่าน"
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <TextInput
              id="fullname"
              label="ชื่อ นามสกุล"
              type="text"
              name="fullname"
              value={this.state.fullname}
              onChange={this.onChange}
              error={errors.fullname}
            />
            <TextInput
              id="phone"
              label="เบอร์โทรศัพท์"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <TextInput
              id="email"
              label="อีเมล"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextArea
              id="address"
              label="ที่อยู่"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              error={errors.address}
            />
            <div className="col s12 center">
              <button
                type="submit"
                className="waves-effect waves-light btn-large pink">
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const stateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  stateToProps,
  { registerUser }
)(withRouter(Register));
