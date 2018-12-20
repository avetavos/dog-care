import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile, saveProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Materialize from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

export class Profile extends Component {
  state = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    errors: {}
  };

  componentWillMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const { fullname, email, phone, address } = nextProps.profile;
      await this.setState({
        fullname,
        email,
        phone,
        address
      });
      await Materialize.updateTextFields();
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const editUser = {
      fullname: this.state.fullname,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email
    };
    this.props.saveProfile(
      this.props.match.params.id,
      editUser,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container-register container">
        <div className="row">
          <div className="col s12 center">
            <h1>โปรไฟล์</h1>
          </div>
          <form className="col s12" onSubmit={this.onSubmit} noValidate>
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
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Profile.propsType = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired
};

const stateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  stateToProps,
  { getProfile, saveProfile }
)(Profile);
