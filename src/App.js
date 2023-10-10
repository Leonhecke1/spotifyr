import React from "react";
import LandingPage from "./components/landing";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./components/profile";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navibar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <>
    <Router>
      <Navibar/>
      <Routes>

       <Route exact path="/" element={<LandingPage/>}/>
       <Route exact path="/profile" element={<Profile/>}/>
     </Routes>
     <Footer/>
    </Router>
    </>
  );
}

export default App;
