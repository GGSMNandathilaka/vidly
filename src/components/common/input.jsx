import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group col-md-6 col-md-offset-3">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        autoFocus
        id={name}
        className="form-control"
      />
      <small className="form-text text-muted"></small>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
