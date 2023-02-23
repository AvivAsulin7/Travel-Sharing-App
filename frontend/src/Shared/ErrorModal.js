import React from "react";
import { Modal } from "@mui/material";
import Button from "./FormElements/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      open={props.error}
      onClose={() => props.setError(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="confirm-container">
        <h3>Something went wrong, please try Again</h3>
        <div className="button-close">
          <Button onClick={() => props.setError(false)}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
