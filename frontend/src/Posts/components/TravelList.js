import React from "react";
import Card from "../../Shared/Card";
import TravelItem from "./TravelItem";
import "./TravelList.css";
import Button from "../../Shared/FormElements/Button";

const TravelList = (props) => {
  return (
    <ul className="place-list">
      {props.items.map((travel) => (
        <TravelItem
          key={travel.id}
          id={travel.id}
          image={travel.image}
          title={travel.title}
          dates={travel.dates}
          description={travel.description}
          creatorId={travel.creator}
          coordinates={travel.location}
          handleDeletedTravel={props.handleDeletedTravel}
        />
      ))}
    </ul>
  );
};

export default TravelList;
