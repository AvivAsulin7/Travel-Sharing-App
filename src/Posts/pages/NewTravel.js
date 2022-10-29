import React, { useCallback, useReducer } from "react";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/util/validators";
import Button from "../../Shared/FormElements/Button";
import { useForm } from "../../Shared/Hooks/FormHook";
import "./NewTravel.css";

const NewTravel = () => {
  const [formState, inputHandle] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const TravelSumbitHandle = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send to backend !
  };

  return (
    <form className="travel-form" onSubmit={TravelSumbitHandle}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        placeholder="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandle}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Title"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandle}
      />
      <Button type="sumbit" disabled={!formState.isValid}>
        Add Travel
      </Button>
    </form>
  );
};

export default NewTravel;
