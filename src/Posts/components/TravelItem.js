import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../Shared/Card";
import "./TravelItem.css";
import Button from "../../Shared/FormElements/Button";
import Map from "../../Shared/Map";
import { Modal } from "@mui/material";

const TravelItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);
  const handleOpenConfirm = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const confirmDelete = () => {
    setShowConfirm(false);
    console.log("DELETING..");
  };

  return (
    <>
      <Modal
        open={showMap}
        onClose={handleCloseMap}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
          <div className="button-close">
            <Button onClick={handleCloseMap}>Close</Button>
          </div>
        </div>
      </Modal>
      <Modal open={showConfirm} onClose={handleCloseConfirm}>
        <div className="confirm-container">
          <div>
            <h3>Are you sure to delete this travel?</h3>
            <Button inverse onClick={confirmDelete}>
              Yes
            </Button>
            <Button danger onClick={handleCloseConfirm}>
              No
            </Button>
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
            <Button inverse onClick={handleOpenMap}>
              View On Map
            </Button>
            <Button to={`edit/${props.id}`}>Edit</Button>
            <Button danger onClick={handleOpenConfirm}>
              Delete
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default TravelItem;
