import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import "./UsersList.css";
import Card from "../../Shared/Card";

const UsersList = ({ items }) => {
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    if (items.length == 0) setIsEmpty(false);
  }, []);

  return (
    <>
      {isEmpty && (
        <div className="center">
          <Card>
            <h2>No users found.</h2>
          </Card>
        </div>
      )}
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
    </>
  );
};

export default UsersList;
