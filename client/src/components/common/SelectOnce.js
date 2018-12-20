import React from "react";
import PropTypes from "prop-types";

const SelectOnce = ({
  id,
  name,
  value,
  onChange,
  error,
  label,
  style,
  options
}) => {
  const selectOption = options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="input-field col s12">
      <select id={id} name={name} value={value} onChange={onChange}>
        {selectOption}
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

SelectOnce.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  options: PropTypes.array.isRequired
};

export default SelectOnce;
