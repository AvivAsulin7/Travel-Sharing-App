import React from "react";
import Card from "../../Shared/Card";
import TravelItem from "./TravelItem";
import "./TravelList.css";

const TravelList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button to="/places/new">Share Place</button>
        </Card>
      </div>
    );
  }

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
        />
      ))}
    </ul>
  );
};

export default TravelList;
