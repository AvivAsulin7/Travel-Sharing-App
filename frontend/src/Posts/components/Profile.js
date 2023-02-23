import React from "react";
import Avatar from "../../Shared/Avatar";
import "./Profile.css";

const Profile = ({ user }) => {
  console.log(user);
  return (
    <div className="profile">
      <div className="upper-container">
        <div className="img-profile">
          <img src={`http://localhost:5000/${user.image}`}></img>
        </div>
      </div>
      <div className="details-profile">
        <h2>{user.name} </h2>
        <h4>{user.city}</h4>
        <h4>{user.age} Years Old</h4>
      </div>
    </div>
  );
};

export default Profile;
