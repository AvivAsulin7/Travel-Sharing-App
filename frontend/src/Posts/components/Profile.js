import React from "react";
import { Image } from "cloudinary-react";
import "./Profile.css";

const Profile = ({ user }) => {
  return (
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
      </div>
    </div>
  );
};

export default Profile;
