import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ id, name, type, value, onChange, error, label }) => {
  return (
    <div className="input-field col s12">
      <textarea
        id={id}
        name={name}
        className="materialize-textarea"
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
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

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default TextArea;
