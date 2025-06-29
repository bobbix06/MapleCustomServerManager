import React, { useState, useEffect } from "react";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [savedApiKey, setSavedApiKey] = useState("");
  const [players, setPlayers] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Dummy sign in simulation
  function signIn() {
    setIsSignedIn(true);
    // In real app, do OAuth here
  }
  function signOut() {
    setIsSignedIn(false);
    setPlayers([]);
  }

  // Simulate fetching online players from API
  useEffect(() => {
    if (!isSignedIn || !savedApiKey) return;

    // Replace this with real API call using savedApiKey
    const dummyPlayers = [
      { id: 1, name: "PlayerOne" },
      { id: 2, name: "PlayerTwo" },
      { id: 3, name: "PlayerThree" },
    ];
    setPlayers(dummyPlayers);
  }, [isSignedIn, savedApiKey]);

  // Save API key handler
  function saveApiKey() {
    setSavedApiKey(apiKey.trim());
    alert("API Key saved!");
  }

  if (!isSignedIn) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Please Sign In</h2>
        <button onClick={signIn}>Sign In</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Maple Hospital Control Panel</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          API Key:{" "}
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: "80%" }}
          />
        </label>
        <button onClick={saveApiKey} style={{ marginLeft: 10 }}>
          Save
        </button>
      </div>

      <h3>Online Players</h3>
      {players.length === 0 ? (
        <p>No players online.</p>
      ) : (
        <ul>
          {players.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}

      <button onClick={signOut} style={{ marginTop: 40 }}>
        Sign Out
      </button>
    </div>
  );
}
