import React, { useState } from "react";
import "./Auth.css";
import Card from "../../Shared/Card";
import Input from "../../Shared/FormElements/Input";
import Button from "../../Shared/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/FormHook";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, inputHandle, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const sumbitAuth = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const switchMode = () => {
    if (!isLogin) {
      // if we signUp now --> and moving to login
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // we in login --> and moving to signUp
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <Card className="auth">
      <h2> {isLogin ? "Login" : "SignUp"}</h2>
      <hr />
      <form>
        {!isLogin && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandle}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandle}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandle}
        />
        <Button
          type="sumbit"
          disabled={!formState.isValid}
          onClick={sumbitAuth}
        >
          {isLogin ? "Login" : "SignUp"}
        </Button>
      </form>
      <Button inverse onClick={switchMode}>
        Switch to {isLogin ? "SignUp" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
