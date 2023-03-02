import React, { useContext } from "react";
import "./UserItem.css";
import Avatar from "../../Shared/Avatar";
import { Link } from "react-router-dom";
import colorNavContext from "../../Shared/Contexts/colorNavContext";
import { AuthContext } from "../../Shared/Contexts/AuthContext";

const UserItem = ({ id, image, name, postsCount }) => {
  const auth = useContext(AuthContext);
  const { setIsActive } = useContext(colorNavContext);
  const handleChangeNavColor = () => {
    if (auth.userId === id) setIsActive("profile");
  };

  return (
    <li className="user-item">
      <div className="user-item__content">
        <Link to={`/${id}`} onClick={() => handleChangeNavColor()}>
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
