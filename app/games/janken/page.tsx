"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function JankenPage() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const hands = [
    { name: "グー", emoji: "✊" },
    { name: "チョキ", emoji: "✌️" },
    { name: "パー", emoji: "🖐️" },
  ];

  const playGame = (choice: string) => {
    const randomChoice = hands[Math.floor(Math.random() * 3)].name;
    setPlayerChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) setResult("あいこ！");
    else if (
      (choice === "グー" && randomChoice === "チョキ") ||
      (choice === "チョキ" && randomChoice === "パー") ||
      (choice === "パー" && randomChoice === "グー")
    )
      setResult("あなたの勝ち！");
    else setResult("あなたの負け！");
  };

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/marble.png')",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Noto Sans JP', sans-serif",
        color: "#333",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          background: "linear-gradient(90deg, #c9d6ff, #e2e2e2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        じゃんけんゲーム
      </motion.h1>

      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        {hands.map((hand) => (
          <motion.button
            key={hand.name}
            whileTap={{ scale: 0.9 }}
            onClick={() => playGame(hand.name)}
            style={{
              background: "white",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              border: "1px solid #ddd",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            {hand.emoji}
          </motion.button>
        ))}
      </div>

      {result && (
        <motion.div
          key={result}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            padding: "20px 40px",
            borderRadius: "20px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <p>あなた：{playerChoice}</p>
          <p>コンピューター：{computerChoice}</p>
          <h2
            style={{
              marginTop: "10px",
              fontSize: "1.5rem",
              color:
                result === "あなたの勝ち！"
                  ? "#4caf50"
                  : result === "あなたの負け！"
                  ? "#f44336"
                  : "#555",
            }}
          >
            {result}
          </h2>
        </motion.div>
      )}

      <button
        onClick={() => router.push("/")}
        style={{
          marginTop: "40px",
          backgroundColor: "#f0f0f0",
          color: "#333",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#e6e6e6")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0f0f0")
        }
      >
        ホームへ戻る
      </button>
    </div>
  );
}
