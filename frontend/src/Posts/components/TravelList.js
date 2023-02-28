import React from "react";
import TravelItem from "./TravelItem";
import "./TravelList.css";

const TravelList = (props) => {
  return (
    <ul className="place-list">
      {props.items.map((travel) => (
        <TravelItem
          key={travel.id}
          id={travel.id}
          image={travel.image}
          title={travel.title}
          header={travel.header}
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
