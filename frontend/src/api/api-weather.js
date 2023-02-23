export const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/current.json",
  params: { q: detailsTravel.title }, // use the location from travel details to get the weather information
  headers: {
    "X-RapidAPI-Key": "d5f42810e4msh9c4b8b2bc4acb91p1a7794jsnc1df9d4b1171",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};
