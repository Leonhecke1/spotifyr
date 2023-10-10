import React from "react";
import { handleLogin } from "../functions/login";
import { Button } from "react-bootstrap";
function LandingPage() {

  return (
    <>
    <div className="landing-wrapper">
      <div className="landing-page">
        <h1>Welcome to Spotifyr</h1>
        <p>Log in with Spotify to view your profile.</p>
        <Button className="time-btn" variant="primary" onClick={handleLogin}>Login with Spotify</Button>
      </div>
    </div>
      <div className="info-wrapper">
    </div>
    </>
  );
}

export default LandingPage;
