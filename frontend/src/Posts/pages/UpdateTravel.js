import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../Shared/FormElements/Button";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/FormHook";
import Card from "../../Shared/Card";
import "./NewTravel.css";

const DUMMY_TRAVELS = [
  {
    id: "p1",
    title: "Madrid",
    description: "One of the most famous cities in the world !",
    image:
      "https://www.travelandleisure.com/thmb/RSoOIuu5uFZcZEUnTh9X8hNZvCk=/1800x1200/filters:fill(auto,1)/aerial-madrid-MADRIDREN1021-b0d6169b39884280ac131f0c3d233623.jpg",
    location: {
      lat: 40.4379543,
      lng: -3.6795367,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "London",
    description: "One of the most famous cities in the world !",
    dates: "17-22 october 22",
    image:
      "https://a.cdn-hotels.com/gdcs/production55/d1816/e4f30f70-a6c6-11e8-bc7c-0242ac110002.jpg",
    location: {
      lat: 51.5286416,
      lng: -0.1015987,
    },
    creator: "u2",
  },
];

const UpdateTravel = () => {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
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

  const travel = DUMMY_TRAVELS.find((travel) => travel.id === postId);

  useEffect(() => {
    //every time we have another travel, we will run setFormData in order to set our form , that we will see in updateTravel page the details of the travel in the form.
    if (travel) {
      setFormData(
        {
          title: {
            value: travel.title,
            isValid: true,
          },
          description: {
            value: travel.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, travel]);

  if (!travel)
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );

  if (isLoading)
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <form className="travel-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enterr a valid title."
        onInput={inputHandle}
        InitialValue={formState.inputs.title.value}
        InitialIsValid={formState.inputs.title.isValid}
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
  );
};

export default UpdateTravel;
