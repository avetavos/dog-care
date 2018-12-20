import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDogs } from "../../actions/dogActions";
import isEmpty from "../../validation/is-empty";
import DogItem from "./DogItem";

export class Dogs extends Component {
  state = {
    dogs: {}
  };

  componentWillMount() {
    this.props.getDogs();
  }

  render() {
    const { dogs } = this.props;
    let dogList;
    if (isEmpty(dogs)) {
      dogList = (
        <div className="col s12 center">
          <h1>คุณยังไม่มีรายชื่อสุนัข</h1>
        </div>
      );
    } else {
      dogList = dogs.map(dog => <DogItem key={dog._id} dog={dog} />);
    }
    return (
      <React.Fragment>
        <div className="row">{dogList}</div>
        <div className="fixed-action-btn direction-top">
          <Link
            to="/newdog"
            className="btn-floating btn-large waves-effect waves-light pink">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

Dogs.propTypes = {
  dogs: PropTypes.object,
  getDogs: PropTypes.func.isRequired
};

const stateToProps = state => ({
  dogs: state.dog.dogs
});

export default connect(
  stateToProps,
  { getDogs }
)(Dogs);
