import React from "react";
import { useParams } from "react-router-dom";

const TravelDetails = () => {
  const { postId } = useParams();

  return <div>{postId}</div>;
};

export default TravelDetails;
