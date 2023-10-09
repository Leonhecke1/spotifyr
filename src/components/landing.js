import React from "react";

function LandingPage() {
  const clientId = "69efe955759c491fa2728f1983f2d741"; // Replace with your Spotify client ID
  const redirectUri = "http://localhost:3000/profile"; // Must match your Spotify application settings


  const handleLogin = () => {
    const codeVerifier = generateCodeVerifier(128);
    generateCodeChallenge(codeVerifier)
      .then((codeChallenge) => {
        localStorage.setItem("verifier", codeVerifier);
        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email%20user-top-read&code_challenge_method=S256&code_challenge=${codeChallenge}`;
        window.location.href = spotifyAuthUrl;
      })
      .catch((error) => {
        console.error("Error generating code challenge:", error);
      });
  };

  const generateCodeVerifier = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCodeChallenge = async (codeVerifier) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Spotify Profile</h1>
      <p>Log in with Spotify to view your profile.</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default LandingPage;
