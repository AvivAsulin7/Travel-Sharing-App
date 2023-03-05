import React, { useState, useContext } from "react";
import "./Auth.css";
import Card from "../../Shared/Card";
import Input from "../../Shared/FormElements/Input";
import Button from "../../Shared/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/FormHook";
import { AuthContext } from "../../Shared/Contexts/AuthContext";
import colorNavContext from "../../Shared/Contexts/colorNavContext";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../api/api";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorModal from "../../Shared/ErrorModal";
import ImageUpload from "../../Shared/FormElements/ImageUpload";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const { setIsActive } = useContext(colorNavContext);

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

  const sumbitAuth = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const { data } = await signIn({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        });
        setIsLoading(false);
        auth.login(data.userId, data.token);
        setIsActive("users");
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        setError(true);
        setMessageError(error.response.data.message);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("file", formState.inputs.image.value);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESETS);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NAME}/image/upload`,
          formData
        );

        const newUser = {
          email: formState.inputs.email.value.toLowerCase(),
          name: formState.inputs.name.value,
          password: formState.inputs.password.value,
          image: response.data.secure_url,
          city: formState.inputs.city.value,
          age: formState.inputs.age.value,
        };

        const { data } = await signUp(newUser);
        setIsLoading(false);
        auth.login(data.userId, data.token);
        setIsActive("users");
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        setError(true);
        setMessageError(error.response.data.message);
      }
    }
  };

  const switchMode = () => {
    if (!isLoginMode) {
      // if we signUp now --> and moving to login
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
          city: undefined,
          age: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
          city: {
            value: "",
            isValid: false,
          },
          age: {
            value: 0,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="auth">
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorModal error={error} setError={setError} message={messageError} />
      )}
      <h2> {isLoginMode ? "Login" : "SignUp"}</h2>
      <hr />
      <form onSubmit={sumbitAuth}>
        {!isLoginMode && (
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
        {!isLoginMode && (
          <ImageUpload
            center
            id="image"
            onInput={inputHandle}
            errorText="Please enter an image"
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
        {!isLoginMode && (
          <Input
            element="input"
            id="city"
            type="city"
            label="City"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid city, at least 3 characters."
            onInput={inputHandle}
          />
        )}
        {!isLoginMode && (
          <Input
            element="input"
            id="age"
            type="age"
            label="Age"
            validators={[VALIDATOR_MIN(15)]}
            errorText="Make sure you are at least 16 years old"
            onInput={inputHandle}
          />
        )}
        <Button type="sumbit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "SignUp"}
        </Button>
      </form>
      <Button inverse onClick={switchMode}>
        Switch to {isLoginMode ? "SignUp" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
