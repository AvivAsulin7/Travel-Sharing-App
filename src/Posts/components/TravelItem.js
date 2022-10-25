import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../Shared/Card";
import "./TravelItem.css";
import Button from "../../Shared/FormElements/Button";
import Map from "../../Shared/Map";
import { Modal } from "@mui/material";

const TravelItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const handleOpen = () => setShowMap(true);
  const handleClose = () => setShowMap(false);
  return (
    <>
      <Modal
        open={showMap}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
          <div className="button-close">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <Link to={`${props.id}`}>
            <div className="place-item__image">
              <img src={props.image} alt={props.title}></img>
            </div>
          </Link>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.dates}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleOpen}>
              View On Map
            </Button>
            <Button to={`/posts/${props.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default TravelItem;
