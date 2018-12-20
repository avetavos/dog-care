import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  id,
  name,
  type,
  value,
  onChange,
  error,
  label,
  style,
  placeholder
}) => {
  return (
    <div className="input-field col s12">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
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

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string
};

export default TextInput;
