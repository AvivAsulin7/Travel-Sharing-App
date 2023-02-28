import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { getUsers } from "../../api/api";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ErrorModal from "../../Shared/ErrorModal";
import Card from "../../Shared/Card";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [messageError, setMessageError] = useState("");

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
        setMessageError(error.response.data.message);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {setError && (
        <ErrorModal error={error} setError={setError} message={messageError} />
      )}
      {users.length === 0 ? (
        <div className="center">
          <Card>
            <h2>No users found.</h2>
          </Card>
        </div>
      ) : (
        <UsersList items={users} />
      )}
    </>
  );
};

export default Users;
