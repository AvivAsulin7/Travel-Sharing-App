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
import colorNavContext from "./Shared/Contexts/colorNavContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [isActive, setIsActive] = useState("home");

  const login = useCallback((uid) => {
    setUserId(uid);
    setIsLoggedIn(true);
    console.log(userId);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setIsLoggedIn(false);
  }, []);

  if (isLoggedIn)
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
        <colorNavContext.Provider value={{ isActive, setIsActive }}>
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
                <Route path="/posts/new" element={<NewTravel />}></Route>
                <Route
                  path="/:userId/edit/:postId" // Edit travel page
                  element={<UpdateTravel />}
                ></Route>
                <Route
                  path="/:userId/:postId"
                  element={<TravelDetails />}
                ></Route>
              </Routes>
            </main>
          </BrowserRouter>
        </colorNavContext.Provider>
      </AuthContext.Provider>
    );
  else
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
        <colorNavContext.Provider value={{ isActive, setIsActive }}>
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
        </colorNavContext.Provider>
      </AuthContext.Provider>
    );
}

export default App;
