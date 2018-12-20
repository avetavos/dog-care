import React, { Component } from "react";
import { connect } from "react-redux";
import { createDogList } from "../../actions/dogActions";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectOnce from "../common/SelectOnce";
import M from "materialize-css/dist/js/materialize.min.js";

export class NewDog extends Component {
  state = {
    name: "",
    sex: "",
    dateofbirth: "",
    primarycolor: "",
    secondarycolor: "",
    breed: "",
    errors: {}
  };

  componentDidMount() {
    var elem = document.querySelectorAll("select");
    M.FormSelect.init(elem, {
      classes: "",
      dropdownOptions: {}
    });
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

    const newDog = {
      name: this.state.name,
      sex: this.state.sex,
      dateofbirth: this.state.dateofbirth,
      primarycolor: this.state.primarycolor,
      secondarycolor: this.state.secondarycolor,
      breed: this.state.breed
    };

    this.props.createDogList(newDog, this.props.history);
  };

  render() {
    const sexOption = [
      { label: "ระบุเพศของสุนัข", value: 0 },
      { label: "เพศผู้", value: "เพศผู้" },
      { label: "เพศเมีย", value: "เพศเมีย" }
    ];
    const colorOption = [
      { label: "ระบุสีขนของสุนัข", value: 0 },
      { label: "สีขาว", value: "สีขาว" },
      { label: "สีดำ", value: "สีดำ" },
      { label: "สีเทา", value: "สีเทา" },
      { label: "สีน้ำตาลแดง", value: "สีน้ำตาลแดง" },
      { label: "สีน้ำตาล", value: "สีน้ำตาล" },
      { label: "สีน้ำตาลอ่อน", value: "สีน้ำตาลอ่อน" }
    ];
    const breedOption = [
      { label: "ระบุสายพันธุ์ของสุนัข", value: 0 },
      { label: "Labrador Retriever", value: "Labrador Retriever" },
      { label: "German Shepherd", value: "German Shepherd" },
      { label: "Golden Retriever", value: "Golden Retriever" },
      { label: "Bulldog", value: "Bulldog" },
      { label: "Beagle", value: "Beagle" },
      { label: "French Bulldog", value: "French Bulldog" },
      { label: "Yorkshire Terrier", value: "Yorkshire Terrier" },
      { label: "Poodle", value: "Poodle" },
      { label: "Rottweiler", value: "Rottweiler" },
      { label: "Boxer", value: "Boxer" },
      {
        label: "German Shorthaired Pointer",
        value: "German Shorthaired Pointer"
      },
      { label: "Siberian Husky", value: "Siberian Husky" },
      { label: "Dachshund", value: "Dachshund" },
      { label: "Doberman Pinscher", value: "Doberman Pinscher" },
      { label: "Great Dane", value: "Great Dane" },
      { label: "Miniature Schnauzer", value: "Miniature Schnauzer" },
      { label: "Australian Shepherd", value: "Australian Shepherd" },
      {
        label: "Cavalier King Charles Spaniel",
        value: "Cavalier King Charles Spaniel"
      },
      { label: "Shih Tzu", value: "Shih Tzu" },
      { label: "Pembroke Welsh Corgi", value: "Pembroke Welsh Corgi" },
      { label: "Pomeranian", value: "Pomeranian" },
      { label: "Boston Terrier", value: "Boston Terrier" },
      { label: "Shetland Sheepdog", value: "Shetland Sheepdog" },
      { label: "Havanese", value: "Havanese" },
      { label: "Mastiff", value: "Mastiff" },
      { label: "Brittany", value: "Brittany" },
      { label: "English Springer Spaniel", value: "English Springer Spaniel" },
      { label: "Chihuahua", value: "Chihuahua" },
      { label: "Bernese Mountain Dog", value: "Bernese Mountain Dog" },
      { label: "Cocker Spaniel", value: "Cocker Spaniel" },
      { label: "Maltese", value: "Maltese" },
      { label: "Vizsla", value: "Vizsla" },
      { label: "Pug", value: "Pug" },
      { label: "Weimaraner", value: "Weimaraner" },
      { label: "Cane Corso", value: "Cane Corso" },
      { label: "Collie", value: "Collie" },
      { label: "Newfoundland", value: "Newfoundland" },
      { label: "Border Collie", value: "Border Collie" },
      { label: "Basset Hound", value: "Basset Hound" },
      { label: "Rhodesian Ridgebacks", value: "Rhodesian Ridgebacks" },
      {
        label: "West Highland White Terrier",
        value: "West Highland White Terrier"
      },
      {
        label: "Chesapeake Bay Retrievers",
        value: "Chesapeake Bay Retrievers"
      },
      { label: "Bullmastiff", value: "Bullmastiff" },
      { label: "Bichon Frise", value: "Bichon Frise" },
      { label: "Shiba Inu", value: "Shiba Inu" },
      { label: "Akita", value: "Akita" },
      {
        label: "Soft Coated Wheaten Terrier",
        value: "Soft Coated Wheaten Terrier"
      },
      { label: "Papillon", value: "Papillon" },
      { label: "Bloodhound", value: "Bloodhound" },
      { label: "St. Bernard", value: "St. Bernard" },
      { label: "Thai Bangkaew", value: "Thai Bangkaew" },
      { label: "Thai Ridgeback", value: "Thai Ridgeback" }
    ];
    const { errors } = this.state;
    return (
      <div className="container-register container">
        <div className="row">
          <div className="col s12 center">
            <h1>สร้างรายชื่อสุนัขของคุณ</h1>
          </div>
          <form className="col s12" onSubmit={this.onSubmit} noValidate>
            <TextInput
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              label="ชื่อสุนัข"
              error={errors.name}
            />
            <SelectOnce
              id="sex"
              name="sex"
              value={this.state.sex}
              onChange={this.onChange}
              label="เพศ"
              error={errors.sex}
              options={sexOption}
            />
            <TextInput
              type="date"
              id="dateofbirth"
              name="dateofbirth"
              value={this.state.dateofbirth}
              onChange={this.onChange}
              label="วัน/เดือน/ปี เกิดสุนัข"
              error={errors.dateofbirth}
            />
            <SelectOnce
              id="primarycolor"
              name="primarycolor"
              value={this.state.primarycolor}
              onChange={this.onChange}
              label="สีหลักของสุนัข"
              error={errors.primarycolor}
              options={colorOption}
            />
            <SelectOnce
              id="secondarycolor"
              name="secondarycolor"
              value={this.state.secondarycolor}
              onChange={this.onChange}
              label="สีรองของสุนัข"
              error={errors.secondarycolor}
              options={colorOption}
            />
            <SelectOnce
              id="breed"
              name="breed"
              value={this.state.breed}
              onChange={this.onChange}
              label="สายพันธุ์"
              error={errors.breed}
              options={breedOption}
            />
            <div className="col s12 center">
              <button
                type="submit"
                className="waves-effect waves-light btn-large pink">
                สร้างรายชื่อสุนัข
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewDog.propTypes = {
  createDogList: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const stateToProps = state => ({
  errors: state.errors
});

export default connect(
  stateToProps,
  { createDogList }
)(NewDog);
