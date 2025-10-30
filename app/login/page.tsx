"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // 仮ログイン（実際の認証は後で追加）
    router.push("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ログインページ</h1>
      <p>ログインボタンを押してホームに進もう！</p>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ログイン
      </button>
    </div>
  );
}
