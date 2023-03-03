import React, { useEffect, useState, useContext } from "react";
import TravelList from "../components/TravelList";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";
import "../components/Profile.css";
import { getUser } from "../../api/api";
import { getTravelsByUser } from "../../api/api";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Card from "../../Shared/Card";
import Button from "../../Shared/FormElements/Button";
import colorNavContext from "../../Shared/Contexts/colorNavContext";
import { AuthContext } from "../../Shared/Contexts/AuthContext";
import { Link } from "react-router-dom";

const UserTravels = () => {
  const [user, setUser] = useState({});
  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const { setIsActive } = useContext(colorNavContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const { data } = await getUser(userId);
        setUser(data.user);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    const getTravels = async () => {
      try {
        const { data } = await getTravelsByUser(userId);
        setTravels(data.travels);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchUser();
    getTravels();
  }, []);

  const handleDeletedTravel = (deletedTravelId) => {
    setTravels((prevTravels) =>
      prevTravels.filter((travel) => travel.id !== deletedTravelId)
    );
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="profile-page">
        <Profile user={user} />
        <TravelList items={travels} handleDeletedTravel={handleDeletedTravel} />
        {/* {auth.userId === user.id && travels.length === 0 ? (
          <div className="place-list center">
            <Card>
              <h2>No travels found. Maybe create one?</h2>
              <Link to="/posts/new" onClick={() => setIsActive("new-travel")}>
                <Button>Share Place</Button>
              </Link>
            </Card>
          </div>
        ) : (
          <TravelList
            items={travels}
            handleDeletedTravel={handleDeletedTravel}
          />
        )} */}
      </div>
    </>
  );
};

export default UserTravels;
