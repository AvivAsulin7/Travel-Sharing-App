import React, { useCallback, useReducer } from "react";

// setFormDate - to set value of form every time we get another page with another travel, example: travel id=1 to travel id=4
// inputHandle - to follow every change in the input and check if is valid or not

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValid,
  });

  const inputHandle = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputeData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputeData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandle, setFormData];
};
