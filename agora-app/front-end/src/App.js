import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import About from "./screens/About";
import Contact from "./screens/contact";
import ViewListing from "./screens/ViewListing";
import Profile from "./screens/Profile";
import agoralogo from "./images/agoralogo.png";
import profileicon from "./images/profileicon.png";
import Navbar from "./components/Nav/navbar.jsx"

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <Link to="/">
            <div className="header-logo">
              <img className="agora-logo" src={agoralogo} alt="agoralogo"></img>
              <div className="agora-text">AGORA </div>{" "}
              <div className="sm-text"> Student Marketplace</div>
            </div>
          </Link>
          <nav className="links">
            <Navbar />
            <Link to="/">HOME </Link>
            {userInfo ? (
              <div>
                <Link to="/profile">Welcome {userInfo.fname}</Link>
                <Link to="/profile">
                  <img
                    className="profile-icon"
                    src={profileicon}
                    alt="profile"
                  ></img>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/signup">REGISTER </Link>
                <Link to="/signin">SIGN IN </Link>
              </div>
            )}
            <Link to="/About">ABOUT </Link>
            <Link to="/contact">CONTACT US </Link>
          </nav>
        </div>
        <div className="search">
          <div>
            <form>
              <input
                className="search-input"
                name="searchWord"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
        <div className="main">
          <div className="content-display">
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/About" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/" exact={true} component={Home} />
            <Route path="/listing/:id" component={ViewListing} />
          </div>
        </div>
        <div className="footer">All Rights Reserved.</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
