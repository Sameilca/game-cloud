'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function OthelloSelect() {
  const router = useRouter();

  const modes = [
    { name: '2人プレイ', path: '/games/othello/two-player' },
    { name: 'CPU対戦', path: '/games/othello/CPU' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fefefe',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '30px' }}>✨ オセロモード選択 ✨</h1>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {modes.map(mode => (
          <div
            key={mode.name}
            onClick={() => router.push(mode.path)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '40px 30px',
              width: '200px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{
              fontSize: '24px',
              marginBottom: '15px'
            }}>🎲</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{mode.name}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push('/')}
        style={{
          marginTop: '40px',
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#005acc';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0070f3';
        }}
      >
        ホームへ戻る
      </button>
    </div>
  );
}
