import React from "react";
import { Form,Col } from 'react-bootstrap' ;

import './style.scss';

const Input = props => {
    return(
        <div>
        <Form.Group as={Col}>
            <Form.Label className="label">{props.labelname}</Form.Label>
            <br />
            <Form.Control
                className="input"
                required
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.handleChange}
            />
            
            <Form.Control.Feedback
                type="invalid"
                className="input-error">
                {props.err}
                </Form.Control.Feedback>  
            </Form.Group>
        </div>
    )
    }
export default Input