import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ items }) => {
  return (
    <ul className="users-list">
      {items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            postsCount={user.travels.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
