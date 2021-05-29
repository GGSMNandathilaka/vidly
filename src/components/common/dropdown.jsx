import React from "react";

const DropDown = ({ name, label, value, error, items, onChange }) => {
  return (
    <div className="form-group col-md-6 col-md-offset-3">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        className="form-control custom-select"
        onChange={onChange}
      >
        <option value=""></option>
        {items.map((item) => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
