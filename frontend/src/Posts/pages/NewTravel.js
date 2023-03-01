import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/util/validators";
import Button from "../../Shared/FormElements/Button";
import { useForm } from "../../Shared/Hooks/FormHook";
import "./NewTravel.css";
import { createTravel } from "../../api/api";
import { AuthContext } from "../../Shared/Contexts/AuthContext";
import ErrorModal from "../../Shared/ErrorModal";
import ImageUpload from "../../Shared/FormElements/ImageUpload";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import axios from "axios";

const NewTravel = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [formState, inputHandle] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      header: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();

  const TravelSumbitHandle = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", formState.inputs.image.value);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESETS);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NAME}/image/upload`,
        formData
      );

      const newTravel = {
        title: formState.inputs.title.value,
        header: formState.inputs.header.value,
        description: formState.inputs.description.value,
        creator: auth.userId,
        image: response.data.secure_url,
      };

      await createTravel(newTravel, auth.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setMessageError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <form className="travel-form" onSubmit={TravelSumbitHandle}>
      {isLoading && <LoadingSpinner />}
      {setError && (
        <ErrorModal error={error} setError={setError} message={messageError} />
      )}
      <Input
        id="title"
        element="input"
        type="text"
        label="Location"
        placeholder="Location"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Location"
        onInput={inputHandle}
      />
      <Input
        id="header"
        element="input"
        type="text"
        label="Title"
        placeholder="Title"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid Tile (at least 5 characters)."
        onInput={inputHandle}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandle}
      />
      <ImageUpload
        id="image"
        onInput={inputHandle}
        errorText="Please enter an image"
      />
      <Button type="sumbit" disabled={!formState.isValid}>
        Add Travel
      </Button>
    </form>
  );
};

export default NewTravel;
