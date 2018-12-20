import React, { Component } from "react";
import TextInput from "../common/TextInput";
import SelectOnce from "../common/SelectOnce";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addVaccin } from "../../actions/dogActions";

export class AddVaccin extends Component {
  state = {
    name: "",
    age: "",
    date: "",
    next: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    var elem = document.querySelectorAll("select");
    M.FormSelect.init(elem, {
      classes: "",
      dropdownOptions: {}
    });
    M.updateTextFields();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const vaccination = {
      name: this.state.name,
      age: this.state.age,
      date: this.state.date,
      next: this.state.next
    };
    this.props.addVaccin(
      this.props.match.params.id,
      vaccination,
      this.props.history
    );
  };

  onHandleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { errors } = this.state;
    const option = [
      { label: "ระบุชื่อวัคซีนที่ได้รับ", value: 0 },
      { label: "ไข้หัดสุนัข", value: "ไข้หัดสุนัข" },
      { label: "ลำไส้อักเสบติดต่อ", value: "ลำไส้อักเสบติดต่อ" },
      {
        label: "โรคหวัดและหลอดลมอักเสบติดต่อ",
        value: "โรคหวัดและหลอดลมอักเสบติดต่อ"
      },
      { label: "โรคตับอักเสบติดต่อ", value: "โรคตับอักเสบติดต่อ" },
      { label: "โรคเลปโตสไปโรซีส", value: "โรคเลปโตสไปโรซีส" },
      { label: "โรคพิษสุนัขบ้า", value: "โรคพิษสุนัขบ้า" }
    ];
    return (
      <React.Fragment>
        <div className="col s12" style={{ paddingTop: "10px" }}>
          <a
            className="waves-effect waves-light btn-flat pink-text"
            onClick={this.onHandleGoBack}>
            <i className="material-icons left">arrow_back</i>ย้อนกลับ
          </a>
        </div>
        <div className="container-register container">
          <div className="row">
            <div className="col s12 center">
              <h1 style={{ marginTop: "10px" }}>เพิ่มวัคซีน</h1>
            </div>
            <form className="col s12" onSubmit={this.onSubmit} noValidate>
              <SelectOnce
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                label="ชื่อวัคซีน"
                error={errors.name}
                options={option}
              />
              <TextInput
                id="age"
                label="อายุสุนัข ณ วันที่รับวัคซีน"
                type="text"
                name="age"
                placeholder={`เช่น 6 สัปดาห์, 16 สัปดาห์, 3 ปี เป็นต้น`}
                value={this.state.age}
                onChange={this.onChange}
                error={errors.age}
              />
              <TextInput
                id="date"
                label="วันที่รับวัคซีน"
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.onChange}
                error={errors.date}
              />
              <TextInput
                id="next"
                label="นัดครั้งต่อไป"
                type="date"
                name="next"
                value={this.state.next}
                onChange={this.onChange}
                error={errors.next}
              />
              <div className="col s12 center">
                <button
                  type="submit"
                  className="waves-effect waves-light btn-large pink">
                  เพิ่มวัคซีน
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddVaccin.propTypes = {
  addVaccin: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const stateToProps = state => ({
  errors: state.errors
});

export default connect(
  stateToProps,
  { addVaccin }
)(AddVaccin);
