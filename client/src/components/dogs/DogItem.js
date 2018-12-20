import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export class DogItem extends Component {
  render() {
    const { dog } = this.props;
    return (
      <div className="col s12 m6">
        <div
          className={classnames(
            "card",
            { "light-blue lighten-5": dog.sex === "เพศผู้" },
            { "pink lighten-5": dog.sex === "เพศเมีย" }
          )}>
          <div className="card-content">
            <h4 style={{ marginTop: 0 }}>{dog.name}</h4>
            <h6>
              <strong>อายุ : </strong>
              <Moment from={dog.dateofbirth} ago />
            </h6>
            <h6>
              <strong>สายพันธุ์ : </strong>
              {dog.breed}
            </h6>
            <h6>
              <strong>สีหลัก : </strong>
              {dog.primarycolor}
            </h6>
            <h6>
              <strong>สีรอง : </strong>
              {dog.secondarycolor}
            </h6>
          </div>
          <div className="card-action">
            <Link
              to={`/dog/${dog._id}`}
              className={classnames(
                { "light-blue-text": dog.sex === "เพศผู้" },
                { "pink-text": dog.sex === "เพศเมีย" }
              )}>
              ข้อมูลวัคซีน
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

DogItem.propTypes = {
  dog: PropTypes.object.isRequired
};

export default DogItem;
