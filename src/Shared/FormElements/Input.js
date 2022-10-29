import React, { useReducer, useEffect } from "react";
import "./Input.css";
import { validate } from "../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

/////////////////////////////////////////////////////////////////////////////////////

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.InitialValue || "",
    isValid: props.InitialIsValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid); // every time we get change in one of this states - onInput(inputHandle) will run and check if all th inputs is valid - if yes, so the button is enabled
  }, [id, inputState.value, inputState.isValid, onInput]);

  const changeHandle = (e) => {
    dispatch({
      // when the input changes, we wil wnat to check if the data is valid or not , and change the style of input (red or not).
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandle = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandle}
        onBlur={touchHandle}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandle}
        onBlur={touchHandle}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      } `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
