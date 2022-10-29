import React from "react";
import TravelList from "../components/TravelList";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";
import "../components/Profile.css";

const UserTravels = ({ DUMMY_TRAVELS, USERS }) => {
  const { userId } = useParams();
  const user = USERS.find((item) => item.id === userId);
  const UserTravels = DUMMY_TRAVELS.filter((item) => item.creator === userId);
  return (
    <div className="profile-page">
      <Profile user={user} />
      <TravelList items={UserTravels} />{" "}
    </div>
  );
};

export default UserTravels;
