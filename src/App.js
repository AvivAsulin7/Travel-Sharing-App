import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./User/pages/Users";
import NewTravel from "./Posts/pages/NewTravel";
import MainNavigation from "./Shared/Navigation/MainNavigation";
import UserTravels from "./Posts/pages/UserTravels";
import TravelDetails from "./Posts/pages/TravelDetails";

const USERS = [
  {
    id: "u1",
    name: "Aviv Asulin",
    country: "Israel",
    city: "Ofakim",
    age: "25",
    image:
      "https://scontent.ftlv1-1.fna.fbcdn.net/v/t39.30808-6/279783956_5505527489459065_5583518148732611244_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=--6INVWKLIEAX8__q2M&_nc_ht=scontent.ftlv1-1.fna&oh=00_AT9gmxcm8KiAw_Y1AfWDIzCd57Cx-cZ1FN3we6LnVwVLTw&oe=635803E2",
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
  return (
    <BrowserRouter>
      <main>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Users USERS={USERS} />}></Route>
          <Route
            path="/:userId"
            element={
              <UserTravels USERS={USERS} DUMMY_TRAVELS={DUMMY_TRAVELS} /> //Link to profile of the user.
            }
          ></Route>
          <Route path="/:userId/:postId" element={<TravelDetails />}></Route>
          <Route path="/posts/new" element={<NewTravel />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
