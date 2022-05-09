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
import Portal from "../Portal/portal";
import Profile from "../Profile/Profile";
// import Covid from "../Covid/Covid";
import Chatbot from "../Chatbot/Chatbot";
// import Admin from "../Admin/Admin";
import Appointment from "../Appointment/Appointment";

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
          <Route
            path="/portal"
            element={[<Header />, <Portal />, <Footer />]}
          />
          <Route path="/profile/:email" element={[<Header />, <Profile />]} />
          <Route
            path="/appointment"
            element={[<Header />, <Appointment />, <Footer />]}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
