import React from "react";

import "./style.scss";

const Input = props => {
  return (
    <div>
      <label>{props.labelname}</label>

      <input
        type={props.type}
        className="input-field"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </div>
  );
};
export default Input;
