import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <div className="img-profile">
        <img src={user.image}></img>
      </div>
      <div className="details-profile">
        <h1>{user.name} </h1>
        <h3>
          {user.country}, {user.city}
        </h3>
        <h3>{user.age} Years Old</h3>
      </div>
    </div>
  );
};

export default Profile;
