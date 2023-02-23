import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Shared/Card";
import "./TravelItem.css";
import Button from "../../Shared/FormElements/Button";
import Map from "../../Shared/Map";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Modal } from "@mui/material";
import { AuthContext } from "../../Shared/Contexts/AuthContext";
import { deleteTravel } from "../../api/api";

const TravelItem = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);
  const handleOpenConfirm = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const confirmDelete = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    try {
      const { data } = await deleteTravel(props.id);
      console.log(data.message);
      setIsLoading(false);
      props.handleDeletedTravel(props.id);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} setError={setError} />}
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
          {isLoading && <LoadingSpinner />}
          <Link to={`/${props.creatorId}/${props.id}`}>
            <div className="place-item__image">
              <img
                src={`http://localhost:5000/${props.image}`}
                alt={props.title}
              ></img>
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
            {auth.userId === props.creatorId && (
              <>
                <Button to={`edit/${props.id}`}>Edit</Button>{" "}
                <Button danger onClick={handleOpenConfirm}>
                  Delete
                </Button>{" "}
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default TravelItem;
