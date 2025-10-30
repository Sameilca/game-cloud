'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from '../styles';

export default function DifficultySelect() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('easy');

  const handleStart = () => {
    // 選択した難易度をクエリとしてCPU対戦ページに渡す
    router.push(`/games/othello/cpu?difficulty=${difficulty}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CPUの難易度を選択</h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontSize: '16px' }}>難易度：</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'normal' | 'hard')}
          style={{ fontSize: '16px', padding: '4px 8px' }}
        >
          <option value="easy">簡単</option>
          <option value="normal">普通</option>
          <option value="hard">難しい</option>
        </select>
      </div>

      <button
        style={{ ...styles.resetButton, fontSize: '16px', padding: '6px 12px' }}
        onClick={handleStart}
      >
        開始
      </button>
    </div>
  );
}
