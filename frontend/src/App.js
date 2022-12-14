import "./App.css";
import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./User/pages/Users";
import NewTravel from "./Posts/pages/NewTravel";
import MainNavigation from "./Shared/Navigation/MainNavigation";
import UserTravels from "./Posts/pages/UserTravels";
import TravelDetails from "./Posts/pages/TravelDetails";
import UpdateTravel from "./Posts/pages/UpdateTravel";
import Auth from "./User/pages/Auth";
import { AuthContext } from "./Shared/Contexts/AuthContext";

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

const DUMMY_TRAVELS = [
  {
    id: "p1",
    title: "Madrid",
    description: "One of the most famous cities in the world !",
    image:
      "https://www.travelandleisure.com/thmb/RSoOIuu5uFZcZEUnTh9X8hNZvCk=/1800x1200/filters:fill(auto,1)/aerial-madrid-MADRIDREN1021-b0d6169b39884280ac131f0c3d233623.jpg",
    location: {
      lat: 40.4379543,
      lng: -3.6795367,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "London",
    description: "One of the most famous cities in the world !",
    dates: "17-22 october 22",
    image:
      "https://a.cdn-hotels.com/gdcs/production55/d1816/e4f30f70-a6c6-11e8-bc7c-0242ac110002.jpg",
    location: {
      lat: 51.5286416,
      lng: -0.1015987,
    },
    creator: "u2",
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  if (isLoggedIn)
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <main>
            <MainNavigation />
            <Routes>
              <Route path="/" element={<Users />}></Route>
              <Route
                path="/:userId"
                element={
                  <UserTravels /> //Link to profile of the user.
                }
              ></Route>
              <Route
                path="/:userId/:postId"
                element={<TravelDetails />}
              ></Route>
              <Route path="/posts/new" element={<NewTravel />}></Route>
              <Route
                path="/:userId/edit/:postId" // Edit travel page
                element={<UpdateTravel />}
              ></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  else
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <main>
            <MainNavigation />
            <Routes>
              <Route path="/" element={<Users />}></Route>
              <Route
                path="/:userId"
                element={
                  <UserTravels /> //Link to profile of the user.
                }
              ></Route>
              <Route
                path="/:userId/:postId"
                element={<TravelDetails />}
              ></Route>
              <Route path="/auth" element={<Auth />}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    );
}

export default App;
