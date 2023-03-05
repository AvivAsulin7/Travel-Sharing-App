import axios from "axios";

const url = "https://travel-app-backend-x2bg.onrender.com";

export const signUp = (user) => axios.post(`${url}/users/signup`, user);
export const signIn = (user) => axios.post(`${url}/users/signin`, user);
export const getUsers = () => axios.get(`${url}/users`);
export const getUser = (userId) => axios.get(`${url}/users/${userId}`);
export const deleteUser = (userId, token) =>
  axios.delete(`${url}/users/delete/${userId}`, {
    headers: { Authorization: "Bearer " + token },
  });

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
