'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as S from '../styles'; // 先ほど作った共通CSSを読み込む

const BOARD_SIZE = 8;

const TwoPlayerOthello: React.FC = () => {
  const router = useRouter();
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);

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
  };

  useEffect(() => {
    initBoard();
  }, []);

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
        if (board[x][y] === opponent) {
          foundOpponent = true;
          x += dx;
          y += dy;
        } else if (board[x][y] === player && foundOpponent) {
          return true;
        } else {
          break;
        }
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
        if (newBoard[x][y] === opponent) {
          toFlip.push([x, y]);
          x += dx;
          y += dy;
        } else if (newBoard[x][y] === player && toFlip.length > 0) {
          for (const [fx, fy] of toFlip) {
            newBoard[fx][fy] = player;
          }
          break;
        } else {
          break;
        }
      }
    }

    newBoard[row][col] = player;
    return newBoard;
  };

  const getValidMoves = (board: number[][], player: number) => {
    const moves: [number, number][] = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (isValidMove(board, i, j, player)) moves.push([i, j]);
      }
    }
    return moves;
  };

  const handleClick = (row: number, col: number) => {
    if (gameOver) return;
    if (!isValidMove(board, row, col, currentPlayer)) return;

    const newBoard = flipDiscs(board, row, col, currentPlayer);
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    const nextMoves = getValidMoves(newBoard, nextPlayer);

    if (nextMoves.length > 0) {
      setBoard(newBoard);
      setCurrentPlayer(nextPlayer);
    } else {
      const myMoves = getValidMoves(newBoard, currentPlayer);
      if (myMoves.length > 0) {
        alert(`プレイヤー${nextPlayer}は置ける場所がありません。パスします。`);
        setBoard(newBoard);
      } else {
        setBoard(newBoard);
        setGameOver(true);
      }
    }
  };

  const countDiscs = (player: number) => board.flat().filter(cell => cell === player).length;

  const handleReset = () => {
    if (confirm('本当にリセットしますか？')) {
      initBoard();
    }
  };

  return (
    <div style={S.container}>
      <h1 style={S.title}>✨ Othello（2人プレイ） ✨</h1>
      <p style={{ marginBottom: '10px' }}>
        {gameOver
          ? 'ゲーム終了！'
          : `プレイヤー${currentPlayer === 1 ? '⚫️' : '⚪️'}の番`}
      </p>

      <div style={S.boardContainer}>
        {board.map((row, i) =>
          row.map((cell, j) => {
            const highlight = isValidMove(board, i, j, currentPlayer);
            return (
              <div
                key={`${i}-${j}`}
                onClick={() => handleClick(i, j)}
                style={{
                  ...S.cellBase,
                  ...(highlight ? S.cellHighlight : { boxShadow: 'inset 0 0 4px #ddd' }),
                }}
              >
                {cell === 1 && <div style={S.blackStone} />}
                {cell === 2 && <div style={S.whiteStone} />}
              </div>
            );
          })
        )}
      </div>

      <div style={S.scoreText}>
        ⚫️ {countDiscs(1)}　⚪️ {countDiscs(2)}
      </div>

      {gameOver && (
        <div style={S.gameOverText}>
          {countDiscs(1) > countDiscs(2)
            ? 'プレイヤー⚫️の勝ち！'
            : countDiscs(1) < countDiscs(2)
            ? 'プレイヤー⚪️の勝ち！'
            : '引き分け！'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button style={S.resetButton} onClick={handleReset}>リセット</button>
        <button style={S.homeButton} onClick={() => router.push('/')}>ホームへ戻る</button>
      </div>
    </div>
  );
};

export default TwoPlayerOthello;
