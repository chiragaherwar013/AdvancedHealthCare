import { React, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "../Header/Header";
import Login from "../Login/Login";
import Yoga from "../Yoga/Yoga";
import BMI from "../BMI/BMI";
import Home from "../Home/Home";
import BloodDonation from "../BloodDonation/BloodDonation";
import Feed from "../Feed/Feed";

// import Profile from "../Profile/Profile";
// import Covid from "../Covid/Covid";
import Chatbot from "../Chatbot/Chatbot";
// import Admin from "../Admin/Admin";

import Footer from "../Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/yoga"
            element={[<Header />, <Yoga />, <Chatbot />, <Footer />]}
          />
          <Route
            path="/smartBMI"
            element={[<Header />, , <Chatbot />, <BMI />]}
          />
          <Route
            path="/bloodDonation"
            element={[<Header />, <BloodDonation />, <Chatbot />, <Footer />]}
          />
          <Route path="/feed" element={[<Header />, <Feed />, <Chatbot />]} />
          {/* <Route path="/profile/:email">
                <Profile />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/covid-19">
                <Covid />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
              </Route> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
