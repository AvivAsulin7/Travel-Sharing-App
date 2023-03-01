import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TravelDetails.css";
import { getTravelById } from "../../api/api";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Button from "../../Shared/FormElements/Button";
import axios from "axios";

const TravelDetails = () => {
  const [detailsTravel, setDetailsTravel] = useState({});
  const [infoTravel, setInfoTravel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchTravel = async () => {
      try {
        const { data } = await getTravelById(postId);
        setDetailsTravel(data.travel);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchTravel();
  }, [postId]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: detailsTravel.title }, // use the location from travel details to get the weather information
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_WEATHER,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    const fetchInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.request(options);
        setInfoTravel(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    if (detailsTravel) {
      fetchInfo();
    }
  }, [detailsTravel]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="details-travel">
        <div className="details-travel-img">
          <img src={`http://localhost:5000/${detailsTravel.image}`}></img>
        </div>
        {infoTravel.location && (
          <div className="details-travel-info">
            <div className="detail">
              <h1>
                {infoTravel.location.name}, {infoTravel.location.country}
              </h1>
            </div>
            <div className="detail">
              <span>Local Time: {infoTravel.location.localtime}</span>
            </div>
            <div className="detail">
              <p>
                {" "}
                Weather: {infoTravel.current.temp_c}°C,{" "}
                {infoTravel.current.condition.text}
              </p>
              <img src={infoTravel.current.condition.icon}></img>
            </div>
            <span>
              <Button to={`/${detailsTravel.creator}`}>Return</Button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default TravelDetails;
