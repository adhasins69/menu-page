import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("menu");

  return (
    <div>
      {page === "menu" && <Menu setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "carousel" && <Carousel setPage={setPage} />}
      {page === "game" && <WhackAMole setPage={setPage} />}
    </div>
  );
}

/* ================= MENU ================= */

function Menu({ setPage }) {
  return (
    <div className="menu">
      <h1>Mini Project Hub 🚀</h1>

      <button onClick={() => setPage("dashboard")}>
        📊 Simple Dashboard
      </button>

      <button onClick={() => setPage("carousel")}>
        🖼 Image Carousel
      </button>

      <button onClick={() => setPage("game")}>
        🐹 Whack A Mole
      </button>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ setPage }) {
  return (
    <div className="page">
      <button onClick={() => setPage("menu")}>⬅ Back</button>
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h4>Total Users</h4>
          <p>1,245</p>
        </div>
        <div className="card">
          <h4>Revenue</h4>
          <p>$34,500</p>
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
    </div>
  );
}

/* ================= CAROUSEL ================= */

function Carousel({ setPage }) {
  const images = [
    "https://picsum.photos/id/1018/800/400/",
    "https://picsum.photos/id/1015/800/400/",
    "https://picsum.photos/id/1019/800/400/"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <button onClick={() => setPage("menu")}>⬅ Back</button>
      <h2>Image Carousel</h2>

      <div className="carousel">
        <button
          onClick={() =>
            setIndex(index === 0 ? images.length - 1 : index - 1)
          }
        >
          ❮
        </button>

        <img src={images[index]} alt="slide" />

        <button
          onClick={() =>
            setIndex(index === images.length - 1 ? 0 : index + 1)
          }
        >
          ❯
        </button>
      </div>
    </div>
  );
}

/* ================= WHACK A MOLE ================= */

function WhackAMole({ setPage }) {
  const [mole, setMole] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [playing, setPlaying] = useState(false);

  const startGame = () => {
    setScore(0);
    setTime(20);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;

    const moleInterval = setInterval(() => {
      setMole(Math.floor(Math.random() * 9));
    }, 700);

    return () => clearInterval(moleInterval);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;

    if (time === 0) {
      setPlaying(false);
      setMole(null);
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, time]);

  return (
    <div className="page">
      <button onClick={() => setPage("menu")}>⬅ Back</button>
      <h2>Whack A Mole 🐹</h2>

      <p>Score: {score} | Time: {time}s</p>

      <div className="grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`hole ${i === mole ? "mole" : ""}`}
            onClick={() => i === mole && setScore(score + 1)}
          >
            {i === mole && "🐹"}
          </div>
        ))}
      </div>

      <button onClick={startGame}>
        {playing ? "Restart" : "Start Game"}
      </button>
    </div>
  );
}

export default App;
