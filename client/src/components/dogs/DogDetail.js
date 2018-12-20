import React, { Component } from "react";
import { getDog, deleteDog } from "../../actions/dogActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import VaccinTable from "./VaccinTable";
import { Link } from "react-router-dom";

export class DogDetail extends Component {
  state = {
    dog: {},
    erorrs: {}
  };

  componentWillMount() {
    this.props.getDog(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dog) {
      this.setState({
        dog: nextProps.dog
      });
    }
  }

  onDeleteVaccin = vaccinId => {
    this.props.deleteVaccin(this.props.match.params.id, vaccinId);
  };

  onDeleteDog = realName => {
    const dogName = prompt("โปรดระบุชื่อสุนัขตัวที่ต้องการลบให้ถูกต้อง : ");
    if (dogName === realName) {
      this.props.deleteDog(this.props.match.params.id, this.props.history);
    } else {
      alert("ชื่อไม่ถูกต้อง");
    }
  };

  render() {
    const { dog } = this.state;
    return (
      <div className="row">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>{dog.name}</h3>
              <hr />
            </div>
            <div className="col s12">
              <h6>
                <span style={{ fontWeight: "bold" }}>เพศ : </span>
                {dog.sex}
              </h6>
              <h6>
                <span style={{ fontWeight: "bold" }}>วัน/เดือน/ปีเกิด : </span>
                <Moment format="DD/MM/YYYY">{dog.dateofbirth}</Moment>
              </h6>
              <h6>
                <span style={{ fontWeight: "bold" }}>อายุ : </span>
                <Moment from={dog.dateofbirth} ago />
              </h6>
              <h6>
                <span style={{ fontWeight: "bold" }}>สีหลัก : </span>
                {dog.primarycolor}
              </h6>
              <h6>
                <span style={{ fontWeight: "bold" }}>สีรอง : </span>
                {dog.secondarycolor}
              </h6>
              <h6>
                <span style={{ fontWeight: "bold" }}>สายพันธุ์ : </span>
                {dog.breed}
              </h6>
              <hr style={{ marginTop: "20px" }} />
            </div>
            <div className="col s12">
              <div className="row">
                <div className="col s6">
                  <h6>
                    <span style={{ fontWeight: "bold" }}>
                      วัคซีนที่ได้รับแล้ว :
                    </span>
                  </h6>
                </div>
                <div className="col s6">
                  <Link
                    to={`/dog/${this.props.match.params.id}/addvaccin`}
                    className="waves-effect waves-light btn-small right green white-text"
                    onClick={this.showModal}>
                    <i className="material-icons left">add</i> เพิ่มวัคซีน
                  </Link>
                </div>
                <div className="col s12" style={{ marginTop: "20px" }}>
                  <VaccinTable
                    vaccination={dog.vaccination}
                    dogId={this.props.match.params.id}
                  />
                </div>
              </div>
              <hr />
            </div>
            <div className="col s12 center">
              <h6>
                <span className="red-text" style={{ fontWeight: "bold" }}>
                  คำเตื่อน :
                </span>{" "}
                หากลบแล้วจะไม่สามารถกู้คืนข้อมูลของสุนัขตัวที่ถูกลบไปแล้วได้
              </h6>
              <button
                type="button"
                className="waves-effect waves-light btn red"
                style={{ marginTop: "10px" }}
                onClick={this.onDeleteDog.bind(this, dog.name)}>
                ลบสุนัขจากรายชื่อ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DogDetail.propTypes = {
  dog: PropTypes.object.isRequired,
  getDog: PropTypes.func.isRequired,
  deleteDog: PropTypes.func.isRequired
};

const stateToProps = state => ({
  dog: state.dog.dog
});

export default connect(
  stateToProps,
  { getDog, deleteDog }
)(DogDetail);
