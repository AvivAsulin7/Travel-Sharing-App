import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../Shared/Card";
import "./TravelItem.css";
import Button from "../../Shared/FormElements/Button";
import Map from "../../Shared/Map";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Modal } from "@mui/material";
import { AuthContext } from "../../Shared/Contexts/AuthContext";
import { deleteTravel } from "../../api/api";
import { Image } from "cloudinary-react";

const TravelItem = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
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
      const { data } = await deleteTravel(props.id, auth.token);
      console.log(data.deletedTravel.image);
      setIsLoading(false);
      props.handleDeletedTravel(props.id);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
      setMessageError(error.response.data.message);
    }
  };

  return (
    <>
      {error && (
        <ErrorModal error={error} setError={setError} message={messageError} />
      )}
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
              <Image cloudName="dmobqngyn" publicId={props.image} />
            </div>
          </Link>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.header}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleOpenMap}>
              View On Map
            </Button>
            {auth.userId === props.creatorId && (
              <>
                <Link to={`edit/${props.id}`}>
                  <Button>Edit</Button>
                </Link>{" "}
                <Button danger onClick={handleOpenConfirm}>
                  Delete
                </Button>{" "}
              </>
            )}
            <Link to={`/${props.creatorId}/${props.id}`}>
              <Button info onClick={handleOpenMap}>
                Info
              </Button>
            </Link>
          </div>
        </Card>
      </li>
    </>
  );
};

export default TravelItem;
