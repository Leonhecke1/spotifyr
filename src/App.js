import React from "react";
import LandingPage from "./components/landing";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./components/profile";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
       <Route exact path="/" element={<LandingPage/>}/>
       <Route exact path="/profile" element={<Profile/>}/>
     </Routes>
    </Router>
    </>
  );
}

export default App;
