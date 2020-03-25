import React from 'react'

const input = (props) => {
    return(
        <div>
        <label>{props.labelname}</label>
        <input
        type = {props.type}
        className = {props.className}
        name = {props.name}
        placeholder = {props.placeholder}
        onChange={props.handleChange} >
        </input>
        </div>
    )
}
export default input

