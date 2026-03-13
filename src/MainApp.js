import React, { useState, useEffect } from "react";
import "./App.css";
import photo1 from "./assests/photo1.webp";
import photo2 from "./assests/photo2.webp";
import photo3 from "./assests/photo3.webp";

const carouselImages = [photo1, photo3, photo2]; // custom order
const MOLE_GRID_SIZE = 9; // 3x3 grid

/* ================= MAIN APP (MENU + ROUTER) ================= */

function App() {
  const [page, setPage] = useState("menu");

  return (
    <div className="app-root">
      {page !== "menu" && (
        <button className="back-button" onClick={() => setPage("menu")}>
          ← Back to menu
        </button>
      )}

      {page === "menu" && <Menu setPage={setPage} />}
      {page === "dashboard" && <Dashboard />}
      {page === "carousel" && <Carousel />}
      {page === "game" && <WhackAMole />}
    </div>
  );
}

/* ================= MENU ================= */

function Menu({ setPage }) {
  return (
    <div className="menu">
      <h1 className="menu-title">Mini Project Hub 🚀</h1>
      <p className="menu-subtitle">Choose a mini project to open</p>

      <div className="menu-buttons">
        <button className="menu-btn" onClick={() => setPage("dashboard")}>
          📊 Simple Dashboard
        </button>
        <button className="menu-btn" onClick={() => setPage("carousel")}>
          🖼 Image Carousel
        </button>
        <button className="menu-btn" onClick={() => setPage("game")}>
          🐹 Whack A Mole
        </button>
      </div>
    </div>
  );
}

/* ================= DASHBOARD (YOUR FULL VERSION) ================= */

function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [theme, setTheme] = useState("light");

  return (
    <div className={`dashboard ${theme}-theme`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MyDashboard</h2>
        <ul>
          <li
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => setActivePage("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activePage === "Analytics" ? "active" : ""}
            onClick={() => setActivePage("Analytics")}
          >
            Analytics
          </li>
          <li
            className={activePage === "Users" ? "active" : ""}
            onClick={() => setActivePage("Users")}
          >
            Users
          </li>
          <li
            className={activePage === "Settings" ? "active" : ""}
            onClick={() => setActivePage("Settings")}
          >
            Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main">
        {/* Navbar */}
        <header className="navbar">
          <h3>{activePage} Overview</h3>
          <div className="profile" onClick={() => setActivePage("Admin")}>
            Admin
          </div>
        </header>

        {activePage === "Dashboard" && (
          <>
            {/* Cards */}
            <div className="cards">
              <div className="card">
                <h4>Total Users</h4>
                <p>2,789</p>
              </div>
              <div className="card">
                <h4>Revenue</h4>
                <p>$58,900</p>
              </div>
              <div className="card">
                <h4>Orders</h4>
                <p>320</p>
              </div>
              <div className="card">
                <h4>Growth</h4>
                <p>12%</p>
              </div>
            </div>

            {/* Table */}
            <div className="table-section">
              <h4>Recent Orders</h4>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1001</td>
                    <td>John Doe</td>
                    <td>Completed</td>
                    <td>$120</td>
                  </tr>
                  <tr>
                    <td>#1002</td>
                    <td>Jane Smith</td>
                    <td>Pending</td>
                    <td>$80</td>
                  </tr>
                  <tr>
                    <td>#1003</td>
                    <td>Michael Lee</td>
                    <td>Cancelled</td>
                    <td>$45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {activePage === "Analytics" && (
          <div className="analytics">
            <div className="analytics-card">
              <h4>Traffic Trend</h4>
              <p className="muted">Last 7 days</p>
              <div className="chart-line">
                <svg viewBox="0 0 100 40" className="chart-line-svg">
                  <polyline
                    points="0,35 15,30 30,32 45,24 60,20 75,15 90,12 100,10"
                  />
                </svg>
                <div className="chart-line-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h4>Growth by Quarter</h4>
              <p className="muted">Quarterly growth (%)</p>
              <div className="chart-with-axes">
                <div className="y-axis-label">Growth %</div>
                <div className="chart-bars">
                  <div className="bar-group">
                    <div className="bar" style={{ height: 40 }}></div>
                    <span>Q1</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar" style={{ height: 55 }}></div>
                    <span>Q2</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar" style={{ height: 70 }}></div>
                    <span>Q3</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar" style={{ height: 60 }}></div>
                    <span>Q4</span>
                  </div>
                </div>
              </div>
              <div className="x-axis-label">Quarter</div>
            </div>

            <div className="analytics-card analytics-metrics">
              <h4>Key Metrics</h4>
              <div className="metrics-grid">
                <div className="metrics-item">
                  <span className="label">Conversion rate</span>
                  <span className="value">3.4%</span>
                </div>
                <div className="metrics-item">
                  <span className="label">Avg. session</span>
                  <span className="value">4m 21s</span>
                </div>
                <div className="metrics-item">
                  <span className="label">Bounce rate</span>
                  <span className="value negative">42%</span>
                </div>
                <div className="metrics-item">
                  <span className="label">New users</span>
                  <span className="value positive">+18%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "Users" && (
          <div className="users-page">
            <div className="user-list">
              <h4>Users</h4>
              <div className="user-card">
                <div>
                  <h5>John Doe</h5>
                  <p className="user-email">john.doe@example.com</p>
                </div>
                <div className="user-meta">
                  <span className="badge">Admin</span>
                  <span className="status online">Active</span>
                </div>
              </div>
              <div className="user-card">
                <div>
                  <h5>Jane Smith</h5>
                  <p className="user-email">jane.smith@example.com</p>
                </div>
                <div className="user-meta">
                  <span className="badge secondary">Editor</span>
                  <span className="status idle">Idle</span>
                </div>
              </div>
              <div className="user-card">
                <div>
                  <h5>Michael Lee</h5>
                  <p className="user-email">michael.lee@example.com</p>
                </div>
                <div className="user-meta">
                  <span className="badge">Admin</span>
                  <span className="status offline">Offline</span>
                </div>
              </div>
              <div className="user-card">
                <div>
                  <h5>Sophia Patel</h5>
                  <p className="user-email">sophia.patel@example.com</p>
                </div>
                <div className="user-meta">
                  <span className="badge secondary">Editor</span>
                  <span className="status online">Active</span>
                </div>
              </div>
              <div className="user-card">
                <div>
                  <h5>Liam Johnson</h5>
                  <p className="user-email">liam.johnson@example.com</p>
                </div>
                <div className="user-meta">
                  <span className="badge">Admin</span>
                  <span className="status idle">Idle</span>
                </div>
              </div>
            </div>

            <div className="user-activity">
              <h4>Recent Activity</h4>
              <ul>
                <li>
                  <span className="activity-time">2 min ago</span>
                  <span className="activity-text">
                    John Doe created a new report.
                  </span>
                </li>
                <li>
                  <span className="activity-time">25 min ago</span>
                  <span className="activity-text">
                    Jane Smith updated dashboard settings.
                  </span>
                </li>
                <li>
                  <span className="activity-time">1 hr ago</span>
                  <span className="activity-text">
                    Michael Lee invited a new user.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activePage === "Settings" && (
          <div className="settings">
            <div className="setting-group">
              <h4>Dashboard Settings</h4>
              <div className="setting-row">
                <div>
                  <p className="setting-label">Default view</p>
                  <p className="setting-description">
                    Choose what you see first after login.
                  </p>
                </div>
                <div className="setting-options">
                  <button className="chip selected">Dashboard</button>
                  <button className="chip">Analytics</button>
                </div>
              </div>
              <div className="setting-row">
                <div>
                  <p className="setting-label">Density</p>
                  <p className="setting-description">
                    Control how compact the tables appear.
                  </p>
                </div>
                <div className="setting-options">
                  <button className="chip selected">Comfortable</button>
                  <button className="chip">Compact</button>
                </div>
              </div>
            </div>

            <div className="setting-group">
              <h4>Notifications</h4>
              <div className="setting-row">
                <div>
                  <p className="setting-label">Email reports</p>
                  <p className="setting-description">
                    Get a weekly summary of your dashboard.
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-row">
                <div>
                  <p className="setting-label">Push notifications</p>
                  <p className="setting-description">
                    Receive alerts for important events.
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-row">
                <div>
                  <p className="setting-label">Product updates</p>
                  <p className="setting-description">
                    Be notified when new features are available.
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-group">
              <h4>Theme</h4>
              <div className="setting-row">
                <div>
                  <p className="setting-label">Appearance</p>
                  <p className="setting-description">
                    Customize how your dashboard looks.
                  </p>
                </div>
                <div className="setting-options">
                  <button
                    className={`chip ${theme === "light" ? "selected" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </button>
                  <button
                    className={`chip ${theme === "dark" ? "selected" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </button>
                  <button
                    className={`chip ${theme === "system" ? "selected" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    System
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "Admin" && (
          <div className="admin-page">
            <div className="admin-panel">
              <div className="admin-main">
                <div className="admin-avatar">A</div>
                <div>
                  <h4 className="admin-name">Alex Martin</h4>
                  <p className="admin-role">System Administrator</p>
                  <p className="admin-email">alex.martin@company.com</p>
                </div>
              </div>
              <div className="admin-meta">
                <div>
                  <p className="meta-label">Employee ID</p>
                  <p className="meta-value">ADM-2043</p>
                </div>
                <div>
                  <p className="meta-label">Department</p>
                  <p className="meta-value">IT Operations</p>
                </div>
                <div>
                  <p className="meta-label">Status</p>
                  <p className="meta-value active">Online</p>
                </div>
              </div>
            </div>

            <div className="admin-details">
              <div className="admin-section">
                <h4>Contact Details</h4>
                <p>Phone: +91 98765 43210</p>
                <p>Backup email: alex.admin@backupmail.com</p>
              </div>
              <div className="admin-section">
                <h4>Access & Permissions</h4>
                <ul>
                  <li>Full access to dashboard analytics</li>
                  <li>Manage users and roles</li>
                  <li>Configure system settings and themes</li>
                </ul>
              </div>
              <div className="admin-section">
                <h4>Security</h4>
                <ul>
                  <li>Two-factor authentication enabled</li>
                  <li>Last password change: 15 days ago</li>
                  <li>Login alerts: Enabled</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CAROUSEL ================= */

function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const heroes = ["Spider-Man", "Dr. Victor Von Doom", "Captain America"];

  const heroDescriptions = [
    [
      "Spider-Man, also known as Peter Parker, is a Marvel Comics superhero who gained his powers after being bitten by a radioactive spider.",
      "He uses his agility, strength, and spider-sense to protect New York City while balancing his life as a regular young adult.",
    ],
    [
      "Dr. Doom is a brilliant scientist, sorcerer, and ruler of the fictional nation Latveria.",
      "Wearing advanced armor and a metal mask, he combines technology and magic in his quest for ultimate power.",
    ],
    [
      "Captain America, also known as Steve Rogers, is a super-soldier who fights for freedom and justice.",
      "Armed with his iconic vibranium shield, he leads with courage, loyalty, and an unshakable moral compass.",
    ],
  ];

  return (
    <div className="carousel">
      <h2 className="page-title">Image Carousel</h2>

      <div className="image-row">
        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={heroes[index]}
            className="carousel-image"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <div className="info-card">
        <h3>{heroes[selectedIndex]}</h3>
        {heroDescriptions[selectedIndex].map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
}

/* ================= WHACK A MOLE (YOUR FULL VERSION) ================= */

const GRID_SIZE = 9; // 3x3 grid

function WhackAMole() {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load saved high score on mount
  useEffect(() => {
    const storedHighScore = localStorage.getItem("whack_a_mole_high_score");
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  // Persist high score whenever it changes
  useEffect(() => {
    localStorage.setItem("whack_a_mole_high_score", String(highScore));
  }, [highScore]);

  // Start Game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  // Random mole movement
  useEffect(() => {
    if (!isPlaying) return;

    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GRID_SIZE);
      setMoleIndex(randomIndex);
    }, 800);

    return () => clearInterval(moleInterval);
  }, [isPlaying]);

  // Timer
  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft === 0) {
      setIsPlaying(false);
      setMoleIndex(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleClick = (index) => {
    if (!isPlaying) return;
    if (index === moleIndex) {
      setScore((prev) => {
        const newScore = prev + 1;
        setHighScore((prevHigh) => (newScore > prevHigh ? newScore : prevHigh));
        return newScore;
      });
      setMoleIndex(null);
    } else {
      setScore((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  return (
    <div className="game">
      <h1>Whack A Mole 🐹</h1>

      <div className="info">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
        <p>Time: {timeLeft}s</p>
      </div>

      <div className="grid">
        {Array.from({ length: GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className={`hole ${index === moleIndex ? "mole" : ""}`}
            onClick={() => handleClick(index)}
          >
            {index === moleIndex && "🐹"}
          </div>
        ))}
      </div>

      <button className="primary-btn" onClick={startGame}>
        {isPlaying ? "Restart" : "Start Game"}
      </button>
    </div>
  );
}

export default App;

