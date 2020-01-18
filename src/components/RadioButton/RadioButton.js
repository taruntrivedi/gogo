import React from "react";
import "./RadioButton.scss";

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input id={props.id} onChange={props.changed} value={props.value} name = {props.name} type="radio"  />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default RadioButton;