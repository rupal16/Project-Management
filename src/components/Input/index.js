import React from "react";
import { InputGroup, FormControl } from 'react-bootstrap' ;

import "./style.scss";

const Input = props => {
  return (
  <div>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1" className="heading">{props.labelname}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
    type={props.type}
      placeholder={props.placeholder}
      className="input-field"
      name={props.name}
      onChange={props.handleChange}
    />
    <div className="input-error">{props.err}</div>
  </InputGroup>
</div>
  );
};
export default Input;
