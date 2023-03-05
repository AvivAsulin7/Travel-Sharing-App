import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { Modal } from "@mui/material";
import { deleteUser } from "../../api/api";
import { AuthContext } from "../../Shared/Contexts/AuthContext";
import Button from "../../Shared/FormElements/Button";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import "./Profile.css";

const Profile = ({ user, setIsDeletedUser, setIsLoading }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const handleOpenConfirm = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const confirmDelete = async () => {
    setShowConfirm(false);
    setIsDeletedUser(true);
    setIsLoading(true);
    try {
      const { data } = await deleteUser(user.id, auth.token);
      setIsLoading(false);
      auth.logout();
      navigate("/");
    } catch (error) {
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
      <Modal open={showConfirm} onClose={handleCloseConfirm}>
        <div className="confirm-container">
          <div>
            <h3>Are you sure to delete your account ?</h3>
            <Button inverse onClick={confirmDelete}>
              Yes
            </Button>
            <Button danger onClick={handleCloseConfirm}>
              No
            </Button>
          </div>
        </div>
      </Modal>
      <div className="profile">
        <div className="upper-container">
          <div className="img-profile">
            <Image cloudName="dmobqngyn" publicId={user.image} />
          </div>
        </div>
        <div className="details-profile">
          <h2>{user.name} </h2>
          <h4>{user.city}</h4>
          <h4>{user.age} Years Old</h4>
          {auth.userId === user.id && (
            <Button danger onClick={handleOpenConfirm}>
              Delete Account
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
