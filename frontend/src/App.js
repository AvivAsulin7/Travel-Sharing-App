import "./App.css";
import { useCallback, useState, useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
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
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  const [isActive, setIsActive] = useState("home");

  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token && new Date(data.expiration) > new Date()) {
      login(data.userId, data.token, new Date(data.expiration));
    }
  }, []);

  if (token)
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, login, logout, userId }}
      >
        <colorNavContext.Provider value={{ isActive, setIsActive }}>
          <HashRouter>
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
          </HashRouter>
        </colorNavContext.Provider>
      </AuthContext.Provider>
    );
  else
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, login, logout, userId }}
      >
        <colorNavContext.Provider value={{ isActive, setIsActive }}>
          <HashRouter>
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
          </HashRouter>
        </colorNavContext.Provider>
      </AuthContext.Provider>
    );
}

export default App;
