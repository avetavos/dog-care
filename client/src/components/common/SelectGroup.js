import React from "react";
import PropTypes from "prop-types";

const SelectGroup = ({ id, name, value, onChange, error, label, style }) => {
  return (
    <div className="input-field col s12">
      <select id={id} name={name} value={value} onChange={onChange}>
        <optgroup label="team 1">
          <option key="0" value="1">
            Option 1
          </option>
          <option key="1" value="2">
            Option 2
          </option>
        </optgroup>
        <optgroup label="team 2">
          <option key="2" value="3">
            Option 3
          </option>
          <option key="3" value="4">
            Option 4
          </option>
        </optgroup>
      </select>
      <label htmlFor={id} style={style}>
        {label}
      </label>
      {error && (
        <span
          className="helper-text red-text"
          data-error="wrong"
          data-success="">
          {error}
        </span>
      )}
    </div>
  );
};

SelectGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default SelectGroup;
