// app/games/othello/styles.ts
export const container = {
  textAlign: 'center' as const,
  minHeight: '100vh' as const,
  background: '#fefefe',
  fontFamily: 'sans-serif',
  paddingTop: '40px',
};

export const title = {
  color: '#333',
  marginBottom: '20px',
};

export const boardContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 50px)',
  justifyContent: 'center',
  gap: '4px',
  marginBottom: '20px',
};

export const cellBase = {
  width: '50px',
  height: '50px',
  backgroundColor: '#dcdcdc',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #e0e0e0'
};

export const cellHighlight = {
  cursor: 'pointer',
  boxShadow: '0 0 10px #d54ff0ff',
};

export const blackStone = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: '#111',
};

export const whiteStone = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: '#fff',
  boxShadow: '0 0 3px #aaa inset',
};

export const scoreText = {
  marginBottom: '20px',
  fontSize: '18px',
};

export const gameOverText = {
  marginBottom: '20px',
  fontWeight: 'bold',
  fontSize: '20px',
};

export const resetButton = {
  backgroundColor: '#ffb6c1',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export const homeButton = {
  backgroundColor: '#0070f3',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
};
