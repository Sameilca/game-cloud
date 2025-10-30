'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from '../styles';

const BOARD_SIZE = 8;

const OthelloCPU: React.FC = () => {
  const router = useRouter();
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1: 人間(黒), 2: CPU(白)
  const [gameOver, setGameOver] = useState(false);
  const [lastCpuMove, setLastCpuMove] = useState<[number, number] | null>(null);

  // 初期化
  const initBoard = () => {
    const newBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    newBoard[3][3] = 2;
    newBoard[4][4] = 2;
    newBoard[3][4] = 1;
    newBoard[4][3] = 1;
    setBoard(newBoard);
    setCurrentPlayer(1);
    setGameOver(false);
    setLastCpuMove(null);
  };

  useEffect(() => { initBoard(); }, []);

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const isValidMove = (board: number[][], row: number, col: number, player: number) => {
    if (board[row][col] !== 0) return false;
    const opponent = player === 1 ? 2 : 1;

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let foundOpponent = false;
      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (board[x][y] === opponent) { foundOpponent = true; x += dx; y += dy; }
        else if (board[x][y] === player && foundOpponent) { return true; }
        else { break; }
      }
    }
    return false;
  };

  const flipDiscs = (board: number[][], row: number, col: number, player: number) => {
    const newBoard = board.map(r => [...r]);
    const opponent = player === 1 ? 2 : 1;

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      const toFlip: [number, number][] = [];
      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (newBoard[x][y] === opponent) { toFlip.push([x, y]); x += dx; y += dy; }
        else if (newBoard[x][y] === player && toFlip.length > 0) { 
          for (const [fx, fy] of toFlip) { newBoard[fx][fy] = player; }
          break; 
        } else { break; }
      }
    }
    newBoard[row][col] = player;
    return newBoard;
  };

  const getValidMoves = (board: number[][], player: number) => {
    const moves: [number, number][] = [];
    for (let i=0; i<BOARD_SIZE; i++)
      for (let j=0; j<BOARD_SIZE; j++)
        if (isValidMove(board, i, j, player)) moves.push([i,j]);
    return moves;
  };

  // CPUの手を少し遅らせる
  useEffect(() => {
    if (currentPlayer === 2 && !gameOver) {
      const cpuMoves = getValidMoves(board, 2);
      if (cpuMoves.length === 0) {
        const humanMoves = getValidMoves(board, 1);
        if (humanMoves.length === 0) setGameOver(true);
        else setCurrentPlayer(1);
        return;
      }
      const timer = setTimeout(() => {
        const [x, y] = cpuMoves[Math.floor(Math.random() * cpuMoves.length)];
        const newBoard = flipDiscs(board, x, y, 2);
        setBoard(newBoard);
        setLastCpuMove([x, y]);
        const nextMoves = getValidMoves(newBoard, 1);
        if (nextMoves.length === 0) {
          const cpuNextMoves = getValidMoves(newBoard, 2);
          if (cpuNextMoves.length === 0) setGameOver(true);
          else setCurrentPlayer(2);
        } else {
          setCurrentPlayer(1);
        }
      }, 800); // 0.8秒遅延
      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, gameOver]);

  const handleClick = (row: number, col: number) => {
    if (gameOver || currentPlayer !== 1) return;
    if (!isValidMove(board, row, col, 1)) return;
    const newBoard = flipDiscs(board, row, col, 1);
    const cpuMoves = getValidMoves(newBoard, 2);
    if (cpuMoves.length === 0) {
      const humanMoves = getValidMoves(newBoard, 1);
      if (humanMoves.length === 0) setGameOver(true);
      else setCurrentPlayer(1);
    } else {
      setBoard(newBoard);
      setCurrentPlayer(2);
      setLastCpuMove(null);
    }
  };

  const countDiscs = (player: number) => board.flat().filter(c => c===player).length;

  const handleReset = () => {
    if (confirm('本当にリセットしますか？')) initBoard();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✨ Othello（CPU対戦） ✨</h1>
      <p style={{ marginBottom: '10px' }}>
        {gameOver ? 'ゲーム終了！' : `あなた⚫️の番`}
      </p>

      <div style={styles.boardContainer}>
        {board.map((row, i) => 
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleClick(i,j)}
              style={{
                ...styles.cellBase,
                ...(isValidMove(board, i, j, currentPlayer) ? styles.cellHighlight : {}),
                ...(lastCpuMove && lastCpuMove[0]===i && lastCpuMove[1]===j ? { boxShadow: '0 0 12px #f0b600' } : {})
              }}
            >
              {cell===1 && <div style={styles.blackStone} />}
              {cell===2 && <div style={styles.whiteStone} />}
            </div>
          ))
        )}
      </div>

      <div style={styles.scoreText}>
        ⚫️ {countDiscs(1)}　⚪️ {countDiscs(2)}
      </div>

      {gameOver && (
        <div style={styles.gameOverText}>
          {countDiscs(1) > countDiscs(2) ? 'あなたの勝ち！' :
           countDiscs(1) < countDiscs(2) ? 'CPUの勝ち！' : '引き分け！'}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'center', gap:'12px' }}>
        <button style={styles.resetButton} onClick={handleReset}>リセット</button>
        <button style={styles.homeButton} onClick={() => router.push('/')}>ホームへ戻る</button>
      </div>
    </div>
  );
};

export default OthelloCPU;
