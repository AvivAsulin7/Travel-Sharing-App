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
      "https://scontent.ftlv1-1.fna.fbcdn.net/v/t39.30808-6/279783956_5505527489459065_5583518148732611244_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=--6INVWKLIEAX8__q2M&_nc_ht=scontent.ftlv1-1.fna&oh=00_AT9gmxcm8KiAw_Y1AfWDIzCd57Cx-cZ1FN3we6LnVwVLTw&oe=635803E2",
    postsCount: 3,
  },
];

const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
