import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Shared/FormElements/Button";
import "./Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <div className="box">
        <div className="starter">
          <h1>Welcome to Travel App!</h1>
          <h3>Start to share...</h3>
          <Link to="/auth" className="btn">
            <Button danger>Sign in/Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
