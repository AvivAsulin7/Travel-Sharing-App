import React from "react";
import TravelList from "../components/TravelList";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";

const UserTravels = ({ DUMMY_TRAVELS, USERS }) => {
  const { userId } = useParams();
  const user = USERS.find((item) => item.id === userId);
  const UserTravels = DUMMY_TRAVELS.filter((item) => item.creator === userId);
  return (
    <>
      <Profile user={user} />
      <TravelList items={UserTravels} />{" "}
    </>
  );
};

export default UserTravels;
