import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { getUsers } from "../../api/api";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorModal from "../../Shared/ErrorModal";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await getUsers();
        setUsers(data.users);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setError(true);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {setError && <ErrorModal error={error} setError={setError} />}
      <UsersList items={users} />
    </>
  );
};

export default Users;
