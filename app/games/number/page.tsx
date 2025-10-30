"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NumberGuessGame() {
  const router = useRouter();
  const [maxNumber, setMaxNumber] = useState(10);
  const [target, setTarget] = useState(generateRandomNumber(10));
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("数字を当ててみてね!");
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber(max: number) {
    return Math.floor(Math.random() * max) + 1;
  }

  function resetGame(newMax: number = maxNumber) {
    const newTarget = generateRandomNumber(newMax);
    setTarget(newTarget);
    setGuess("");
    setAttempts(0);
    setMessage("新しいゲームが始まったよ!");
  }

  function handleGuess() {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("数字を入力してね 💭");
      return;
    }
    setAttempts(attempts + 1);
    if (num === target) {
      setMessage(`🎉 正解！${attempts + 1}回で当たったよ！`);
    } else if (num < target) {
      setMessage("もう少し大きいよ 💭");
    } else {
      setMessage("もう少し小さいよ 💭");
    }
  }

  function handleDifficultyChange(max: number) {
    setMaxNumber(max);
    resetGame(max);
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => router.push("/")}>
        ← ホームにもどる
      </button>

      <h1 style={styles.title}>🎲 数当てゲーム 🎲</h1>

      <div style={styles.difficultyContainer}>
        <button
          style={{
            ...styles.difficultyButton,
            backgroundColor:
              maxNumber === 10 ? "#fdfdfd" : "rgba(255,255,255,0.8)",
          }}
          onClick={() => handleDifficultyChange(10)}
        >
          かんたん（1〜10）
        </button>
        <button
          style={{
            ...styles.difficultyButton,
            backgroundColor:
              maxNumber === 50 ? "#fdfdfd" : "rgba(255,255,255,0.8)",
          }}
          onClick={() => handleDifficultyChange(50)}
        >
          ふつう（1〜50）
        </button>
        <button
          style={{
            ...styles.difficultyButton,
            backgroundColor:
              maxNumber === 100 ? "#fdfdfd" : "rgba(255,255,255,0.8)",
          }}
          onClick={() => handleDifficultyChange(100)}
        >
          むずかしい（1〜100）
        </button>
      </div>

      <div style={styles.card}>
        <p style={styles.message}>{message}</p>

        <input
          style={styles.input}
          type="number"
          value={guess}
          placeholder={`1〜${maxNumber}`}
          onChange={(e) => setGuess(e.target.value)}
        />

        <button style={styles.mainButton} onClick={handleGuess}>
          決定する!
        </button>

        <button style={styles.resetButton} onClick={() => resetGame()}>
          リセットする ♻️
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f9f9f9 40%, #f3f3f3 100%)",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/marble.png')",
    backgroundSize: "cover",
    fontFamily: "'Zen Maru Gothic', sans-serif",
    color: "#444",
    padding: "2rem 1rem",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: "1rem",
    border: "none",
    background: "none",
    fontSize: "0.95rem",
    color: "#777",
    cursor: "pointer",
    transition: "0.3s",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "1.5rem",
    textShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  difficultyContainer: {
    display: "flex",
    gap: "0.6rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  difficultyButton: {
    padding: "0.6rem 1.2rem",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "20px",
    padding: "2rem 2rem 2.5rem",
    boxShadow: "0 5px 12px rgba(0,0,0,0.08)",
    backdropFilter: "blur(10px)",
    width: "90%",
    maxWidth: "350px",
    textAlign: "center" as const,
  },
  message: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "1px solid #ddd",
    marginBottom: "1.2rem",
    textAlign: "center" as const,
    outline: "none",
  },
  mainButton: {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "0.2s",
    marginBottom: "0.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  resetButton: {
    width: "100%",
    padding: "0.6rem",
    fontSize: "0.9rem",
    borderRadius: "10px",
    border: "1px solid #eee",
    backgroundColor: "#fafafa",
    cursor: "pointer",
  },
};
