import axios from "axios";

const url = "http://localhost:5000";

export const signUp = (user) => axios.post(`${url}/users/signup`, user);
export const signIn = (user) => axios.post(`${url}/users/signin`, user);
export const getUsers = () => axios.get(`${url}/users`);
export const getUser = (userId) => axios.get(`${url}/users/${userId}`);

///////////////

export const getTravelsByUser = (userId) =>
  axios.get(`${url}/travels/user/${userId}`);

export const getTravelById = (travelId) =>
  axios.get(`${url}/travels/${travelId}`);

export const createTravel = (travel, token) =>
  axios.post(`${url}/travels/newTravel`, travel, {
    headers: { Authorization: "Bearer " + token },
  });

export const updateDetailsOfTravel = (travelId, details, token) =>
  axios.patch(`${url}/travels/${travelId}`, details, {
    headers: { Authorization: "Bearer " + token },
  });

export const deleteTravel = (travelId, token) =>
  axios.delete(`${url}/travels/${travelId}`, {
    headers: { Authorization: "Bearer " + token },
  });
