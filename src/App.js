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
      {/* NEW: show Tic Tac Toe when page state is "tictactoe". */}
      {page === "tictactoe" && <TicTacToe setPage={setPage} />}
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

      {/* NEW: menu button that switches to the Tic Tac Toe page. */}
      <button onClick={() => setPage("tictactoe")}>
        ⭕ Tic Tac Toe
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

/* ================= TIC TAC TOE ARENA (INTERACTIVE) ================= */

// Shape options: X, O, star (★), diamond (◆), circle (●), triangle (▲).
// Add or remove symbols here to change the picker buttons.
const SYMBOL_OPTIONS = ["X", "O", "★", "◆", "●", "▲"];

const DEFAULT_PLAYER_ONE_SYMBOL = "X";
const DEFAULT_PLAYER_TWO_SYMBOL = "O";

// Exported for MainApp.js — keeps all Tic Tac Toe code in this file.
export function TicTacToe({ setPage }) {
  // STATE: 3x3 board stored as an array of 9 cells (null = empty).
  const [board, setBoard] = useState(Array(9).fill(null));

  // STATE: true = Player 1 turn, false = Player 2 turn.
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);

  // STATE: each player picks their own shape before/during play.
  const [playerOneSymbol, setPlayerOneSymbol] = useState(DEFAULT_PLAYER_ONE_SYMBOL);
  const [playerTwoSymbol, setPlayerTwoSymbol] = useState(DEFAULT_PLAYER_TWO_SYMBOL);

  // WINNER CHECK: returns winner symbol + which 3 squares won (for glow highlight).
  function getWinnerInfo(currentBoard) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], winningLine: line };
      }
    }

    return { winner: null, winningLine: [] };
  }

  const { winner, winningLine } = getWinnerInfo(board);

  // DRAW CHECK: every cell filled and no winner.
  const isDraw = board.every((cell) => cell !== null) && !winner;

  // Symbol for the player whose turn it is right now.
  const currentSymbol = isPlayerOneTurn ? playerOneSymbol : playerTwoSymbol;

  // STATUS: turn display, congratulations on win, or draw message.
  let statusText = `Player ${isPlayerOneTurn ? "1" : "2"} turn: ${currentSymbol}`;
  if (winner) {
    statusText = `Congratulations! ${winner} wins the game!`;
  } else if (isDraw) {
    statusText = "It's a draw! Great battle!";
  }

  // CLICK: state -> user click -> update state -> check winner -> re-render UI.
  function handleSquareClick(index) {
    if (board[index] || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = currentSymbol;

    setBoard(nextBoard);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  }

  // RESTART: clear the board; keep chosen shapes.
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true);
  }

  // SHAPE PICKER: prevent both players from choosing the same shape.
  function handleSymbolChange(playerNumber, newSymbol) {
    if (playerNumber === 1 && newSymbol === playerTwoSymbol) return;
    if (playerNumber === 2 && newSymbol === playerOneSymbol) return;

    if (playerNumber === 1) {
      setPlayerOneSymbol(newSymbol);
    } else {
      setPlayerTwoSymbol(newSymbol);
    }

    resetGame();
  }

  return (
    <div className="ttt-arena-wrap">
      {/* Back button only in simple App.js routing (MainApp uses its own back button). */}
      {setPage && (
        <button className="ttt-back-btn" onClick={() => setPage("menu")}>
          ⬅ Back to menu
        </button>
      )}

      {/* Decorative background blobs — styling in App.css (.ttt-bg-shape). */}
      <div className="ttt-bg-shape ttt-shape-one" />
      <div className="ttt-bg-shape ttt-shape-two" />
      <div className="ttt-bg-shape ttt-shape-three" />

      <section className="ttt-game-card">
        <p className="ttt-eyebrow">Mini game</p>
        <h1 className="ttt-title">Tic Tac Toe Arena</h1>
        <p className="ttt-subtitle">
          Pick your shape, play the board, and celebrate the winner.
        </p>

        {/* Player 1 and Player 2 shape pickers */}
        <div className="ttt-symbol-panel">
          <div className="ttt-symbol-picker">
            <p>Player 1</p>
            <div className="ttt-symbol-options">
              {SYMBOL_OPTIONS.map((symbol) => (
                <button
                  key={`p1-${symbol}`}
                  type="button"
                  className={
                    symbol === playerOneSymbol
                      ? "ttt-symbol-btn ttt-symbol-btn-active"
                      : "ttt-symbol-btn"
                  }
                  onClick={() => handleSymbolChange(1, symbol)}
                  disabled={symbol === playerTwoSymbol}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="ttt-symbol-picker">
            <p>Player 2</p>
            <div className="ttt-symbol-options">
              {SYMBOL_OPTIONS.map((symbol) => (
                <button
                  key={`p2-${symbol}`}
                  type="button"
                  className={
                    symbol === playerTwoSymbol
                      ? "ttt-symbol-btn ttt-symbol-btn-active"
                      : "ttt-symbol-btn"
                  }
                  onClick={() => handleSymbolChange(2, symbol)}
                  disabled={symbol === playerOneSymbol}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p
          className={
            winner ? "ttt-status ttt-winner-status" : "ttt-status"
          }
        >
          {statusText}
        </p>

        {/* 3x3 board — winning squares get .ttt-winning-square for glow */}
        <div className="ttt-board">
          {board.map((cellValue, index) => (
            <button
              key={index}
              type="button"
              className={
                winningLine.includes(index)
                  ? "ttt-square ttt-winning-square"
                  : "ttt-square"
              }
              onClick={() => handleSquareClick(index)}
            >
              {cellValue}
            </button>
          ))}
        </div>

        <button type="button" className="ttt-reset-btn" onClick={resetGame}>
          Restart Game
        </button>
      </section>
    </div>
  );
}

export default App;
