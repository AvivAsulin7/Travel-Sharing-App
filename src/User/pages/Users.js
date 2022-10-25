import React from "react";
import UsersList from "../components/UsersList";

const Users = ({ USERS }) => {
  return <UsersList items={USERS} />;
};

export default Users;
