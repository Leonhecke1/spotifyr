import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("long_term"); // Default to 1 year

  const clientId = "69efe955759c491fa2728f1983f2d741";
  const redirectUri = "http://localhost:3000/profile";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getAccessToken(code);
    } else {
      setError("Authorization code not found.");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update top artists when timeRange changes
    getTopArtists(localStorage.getItem("access_token"), timeRange);
  }, [timeRange]);

  const getAccessToken = async (code) => {
    const codeVerifier = localStorage.getItem("verifier");
    if (!codeVerifier) {
      setError("Code verifier not found.");
      setLoading(false);
      return;
    }

    const requestBody = new URLSearchParams();
    requestBody.append("client_id", clientId);
    requestBody.append("grant_type", "authorization_code");
    requestBody.append("code", code);
    requestBody.append("redirect_uri", redirectUri);
    requestBody.append("code_verifier", codeVerifier);

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to get access token.");
      }

      const data = await response.json();
      const accessToken = data.access_token;
      localStorage.setItem("access_token", accessToken);
      getUserProfile(accessToken);
    } catch (error) {
      setError("Error getting access token: " + error.message);
      setLoading(false);
    }
  };

  const getUserProfile = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      setError("Error fetching user profile: " + error.message);
      setLoading(false);
    }
  };

  const getTopArtists = async (accessToken, range) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
     
      }

      const data = await response.json();
      setTopArtists(data.items);
      setLoading(false);
    } catch (error) {
      setError("Error fetching top artists: " + error.message);
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  return (
    <div className="profile">
      {profile && (
        <>
        <div className="welcome-banner">
          <h1>Welcome, {profile.display_name}!</h1>
          <h2>Your Top Artists:</h2>
          <div className="time-range">
            <ToggleButtonGroup
              type="radio"
              name="timeRange"
              value={timeRange}
              onChange={handleTimeRangeChange}
            >
              <ToggleButton className="time-btn" variant="primary" value={"long_term"}>1 Year</ToggleButton>
              <ToggleButton className="time-btn" variant="primary" value={"medium_term"}>6 Months</ToggleButton>
              <ToggleButton className="time-btn" variant="primary" value={"short_term"}>3 Months</ToggleButton>
            </ToggleButtonGroup>
            </div>
          </div>
          <div className="artist-wrapper">
            <ul>
              {topArtists.map((artist) => (
                <li className="artist-info" key={artist.id}>
                  {artist.images.length > 0 && (
                    <img
                      className="artist-image"
                      src={artist.images[0].url}
                      alt={artist.name}
                      width={150}
                      height={150}
                    />
                  )}
                  <div className="artist-text">
                    <span className="artist-name">{artist.name}</span>
                    {artist.genres && artist.genres.length > 0 && (
                      <p className="artist-genre">
                        Genres: {artist.genres.join(", ")}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
