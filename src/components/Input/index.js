import React from "react";

const Input = props => {
  return (
    <div>
      <label>{props.labelname}</label>

      <input
        type={props.type}
        className={props.className}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </div>
  );
};
export default Input;
