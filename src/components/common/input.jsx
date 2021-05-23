import React from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        onChange={onChange}
        autoFocus
        id={name}
        type="text"
        className="form-control"
      />
      <small className="form-text text-muted"></small>
    </div>
  );
};

export default Input;
