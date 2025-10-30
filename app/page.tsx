"use client";

import Link from "next/link";

export default function Home() {
  const games = [
    {
      title: "じゃんけんゲーム",
      image: "https://placehold.co/300x200?text=Janken",
      link: "/games/janken",
    },
    {
      title: "数当てゲーム",
      image: "https://placehold.co/300x200?text=Number",
      link: "/games/number",
    },
    {
      title: "オセロゲーム",
      image: "https://placehold.co/300x200?text=othello",
      link: "/games/othello/select",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">🎮 My Game Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl px-6">
        {games.map((game) => (
          <Link
            key={game.title}
            href={game.link}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{game.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}