import { React, useContext } from "react";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import "./App.css";

// Components
import Header from "../Header/Header";
// import Login from "../Login/Login";
// import Home from "../Home/Home";
// import BloodDonation from "../BloodDonation/BloodDonation";
import Yoga from "../Yoga/Yoga";
// import Profile from "../Profile/Profile";
// import Footer from "../Footer/Footer";
// import Covid from "../Covid/Covid";
// import Chatbot from "../Chatbot/Chatbot";
// import Admin from "../Admin/Admin";
import BMI from "../BMI/BMI";

const App = () => {
  const [user] = useContext(UserContext);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/yogaAasans" element={<Yoga />} />
          <Route path="/smartBMI" element={<BMI />} />

          {/* <Chatbot /> */}

          {/* <Route path="/home">
                <Home />
              </Route>
                
              <Route path="/bloodDonation">
                <BloodDonation />
              </Route> */}

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

          {/* <Footer /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
