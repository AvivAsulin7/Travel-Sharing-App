import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className="loading-spinner__overlay">
      <div className="lds-dual-ring">
        <h4>Loading...</h4>
      </div>
    </div>
  );
};

export default LoadingSpinner;
