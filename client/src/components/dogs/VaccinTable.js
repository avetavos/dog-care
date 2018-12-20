import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";
import { connect } from "react-redux";
import { deleteVaccin } from "../../actions/dogActions";

export class VaccinTable extends Component {
  deleteVaccin = (dogId, vaccinId) => {
    if (window.confirm("คุณต้องการลบวัคซินนี้ใช่หรือไม่")) {
      this.props.deleteVaccin(dogId, vaccinId);
    }
  };

  render() {
    const { vaccination, dogId } = this.props;
    let data;
    if (!isEmpty(vaccination)) {
      data = vaccination.map((vaccin, index) => (
        <tr key={index}>
          <td>{vaccin.name}</td>
          <td>{vaccin.age}</td>
          <td>
            <Moment format="DD/MM/YYYY">{vaccin.date}</Moment>
          </td>
          <td>
            <Moment format="DD/MM/YYYY">{vaccin.next}</Moment>
          </td>
          <td>
            <i
              className="material-icons red-text"
              onClick={this.deleteVaccin.bind(this, dogId, vaccin._id)}>
              delete
            </i>
          </td>
        </tr>
      ));
    } else {
      data = (
        <tr className="row">
          <td colSpan="5">
            <div className="col s12 center" style={{ margin: "30px 0 30px 0" }}>
              <h3>ยังไม่ได้รับการฉีดวัคซีน</h3>
            </div>
          </td>
        </tr>
      );
    }
    return (
      <React.Fragment>
        <table className="responsive-table striped centered">
          <thead>
            <tr>
              <th>ชื่อวัคซีน</th>
              <th>อายุ ณ วันที่รับ</th>
              <th>วันที่รับวัคซีน</th>
              <th>นัดครั้งต่อไป</th>
              <th />
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

VaccinTable.propTypes = {
  vaccination: PropTypes.array,
  deleteVaccin: PropTypes.func.isRequired,
  dogId: PropTypes.string.isRequired
};

const stateToProps = state => ({});

export default connect(
  stateToProps,
  { deleteVaccin }
)(VaccinTable);
