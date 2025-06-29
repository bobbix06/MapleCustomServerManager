import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [savedApiKey, setSavedApiKey] = useState("");
  const [players, setPlayers] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [serverStatus, setServerStatus] = useState("Online");
  const [serverStats, setServerStats] = useState({
    uptime: "2h 45m",
    playerCount: 0,
    maxPlayers: 100
  });

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
      { id: 1, name: "PlayerOne", level: 85, job: "Hero" },
      { id: 2, name: "PlayerTwo", level: 72, job: "Paladin" },
      { id: 3, name: "PlayerThree", level: 156, job: "Arch Mage" },
    ];
    setPlayers(dummyPlayers);
    setServerStats(prev => ({ ...prev, playerCount: dummyPlayers.length }));
  }, [isSignedIn, savedApiKey]);

  // Save API key handler
  function saveApiKey() {
    if (!apiKey.trim()) {
      alert("Please enter a valid API key");
      return;
    }
    setSavedApiKey(apiKey.trim());
    alert("API Key saved successfully!");
  }

  // Server control functions
  function kickAllPlayers() {
    if (confirm("Are you sure you want to kick all players from the server?")) {
      alert("Kicking all players...");
      setPlayers([]); // Clear the players list
      setServerStats(prev => ({ ...prev, playerCount: 0 }));
      // In real app, make API call to kick all players
    }
  }

  if (!isSignedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Maple Server Control Panel</h2>
          <p>Please sign in to access the dashboard</p>
          <button onClick={signIn} className="login-btn">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🍁 Maple Server Control Panel</h1>
        <button onClick={signOut} className="logout-btn">Sign Out</button>
      </header>

      <div className="dashboard-content">
        <div className="api-section">
          <h3>API Configuration</h3>
          <div className="api-input-group">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="api-input"
            />
            <button onClick={saveApiKey} className="save-btn">Save</button>
          </div>
          {savedApiKey && <p className="api-status">✅ API Key configured</p>}
        </div>

        <div className="server-stats">
          <h3>Server Status</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Status</span>
              <span className={`stat-value status-${serverStatus.toLowerCase()}`}>{serverStatus}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Players Online</span>
              <span className="stat-value">{serverStats.playerCount}/{serverStats.maxPlayers}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Uptime</span>
              <span className="stat-value">{serverStats.uptime}</span>
            </div>
          </div>
        </div>

        <div className="server-controls">
          <h3>Server Controls</h3>
          <div className="control-buttons">
            <button onClick={kickAllPlayers} className="control-btn kick-btn">Kick All Players</button>
          </div>
        </div>

        <div className="players-section">
          <h3>Online Players ({players.length})</h3>
          {players.length === 0 ? (
            <p className="no-players">No players currently online</p>
          ) : (
            <div className="players-list">
              {players.map((player) => (
                <div key={player.id} className="player-card">
                  <span className="player-name">{player.name}</span>
                  <span className="player-level">Lvl {player.level}</span>
                  <span className="player-job">{player.job}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
