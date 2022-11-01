import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TravelDetails.css";
import { fetchData } from "../../api/fetchData";

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

const TravelDetails = () => {
  const [weatherDetails, setWetherDetails] = useState({});
  const { postId } = useParams();
  const detailsTravel = DUMMY_TRAVELS.find((travel) => travel.id == postId);

  return (
    <div className="details-travel">
      <div className="details-travel-img">
        <img src={detailsTravel.image}></img>
      </div>
      <div className="details-travel">
        <h1>{detailsTravel.title}</h1>
      </div>
    </div>
  );
};

export default TravelDetails;
