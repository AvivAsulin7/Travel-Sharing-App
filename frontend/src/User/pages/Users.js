import React from "react";
import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Aviv Asulin",
    country: "Israel",
    city: "Ofakim",
    age: "25",
    image:
      "https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg",
    postsCount: 3,
  },
];

const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
