import React from 'react';
import { Form, Col } from 'react-bootstrap';

import './style.scss';

const Input = props => {
  return (
    <div>
      <Form.Group as={Col}>
        <Form.Label className="label">{props.labelname}</Form.Label>
        <br />
        <Form.Control
          className="input"
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          onBlur={props.onBlur}
          onChange={props.handleChange}
        />

        <Form.Control.Feedback type="invalid" className="input-error">
          {props.err}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};
export default Input;
