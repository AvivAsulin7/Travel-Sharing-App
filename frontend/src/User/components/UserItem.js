import React from "react";
import "./UserItem.css";
import Avatar from "../../Shared/Avatar";
import Card from "../../Shared/Card";
import { Link } from "react-router-dom";

const UserItem = ({ id, image, name, postsCount }) => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <Link to={`/${id}`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {postsCount} {postsCount === 1 ? "Travel" : "Travels"}{" "}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
