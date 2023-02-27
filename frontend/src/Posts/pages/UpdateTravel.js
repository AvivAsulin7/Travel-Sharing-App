import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Shared/FormElements/Button";
import Input from "../../Shared/FormElements/Input";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorModal from "../../Shared/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/FormHook";
import "./NewTravel.css";
import { getTravelById } from "../../api/api";
import { updateDetailsOfTravel } from "../../api/api";
import { AuthContext } from "../../Shared/Contexts/AuthContext";

const UpdateTravel = () => {
  const auth = useContext(AuthContext);
  console.log(auth.token);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [travel, setTravel] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [formState, inputHandle, setFormData] = useForm(
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

  useEffect(() => {
    const fetchTravel = async () => {
      setIsLoading(true);
      try {
        const { data } = await getTravelById(postId);
        console.log(data.travel);
        setTravel(data.travel);
        setFormData(
          {
            header: {
              value: data.travel.header,
              isValid: true,
            },

            description: {
              value: data.travel.description,
              isValid: true,
            },
          },
          true
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
        setMessageError(error.response.data.message);
      }
    };
    fetchTravel();
  }, [postId, setFormData]); // find the specific travel by id from req.params

  const travelUpdateSumbit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const details = {
      header: formState.inputs.header.value,
      description: formState.inputs.description.value,
    };
    try {
      const { data } = await updateDetailsOfTravel(postId, details, auth.token);
      console.log(data.travel);
      setIsLoading(false);
      navigate(`/${auth.userId}`);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(true);
      setMessageError(error.response.data.message);
    }
  };

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (!travel && !error)
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );

  return (
    <>
      {error && (
        <ErrorModal error={error} setError={setError} message={messageError} />
      )}
      <form className="travel-form" onSubmit={travelUpdateSumbit}>
        <Input
          id="header"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enterr a valid Title (min 5 characters)."
          onInput={inputHandle}
          InitialValue={formState.inputs.header.value}
          InitialIsValid={formState.inputs.header.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enterr a valid Description (min 5 characters)."
          onInput={inputHandle}
          InitialValue={formState.inputs.description.value}
          InitialIsValid={formState.inputs.description.isValid}
        />
        <Button type="sumbit" disabled={!formState.isValid}>
          Update Travel
        </Button>
      </form>
    </>
  );
};

export default UpdateTravel;
