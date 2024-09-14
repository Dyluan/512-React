import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [gameStarted, setGameStarted] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const isOpposes = (liste) => liste[0] === liste[2] && liste[1] === 0 && liste[0] !== 0;
  const isPremiers = (liste) => liste[0] === liste[1] && liste[0] !== 0;
  const isDerniers = (liste) => liste[1] === liste[2] && liste[1] !== 0;

  const isGameOver = useCallback(() => {
    // Check if there are any empty cells
    if (board.includes(0)) return false;
    console.log('avant le if')

    // Check for possible moves horizontally and vertically
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        // Check horizontal
        if (board[i * 3 + j] === board[i * 3 + j + 1]) return false;
        // Check vertical
        if (board[i + j * 3] === board[i + (j + 1) * 3]) return false;
      }
    }

    // If we reach here, no moves are possible
    return true;
  }, [board]);

  const addition = useCallback((liste) => {
    const result = [...liste];
    if (isOpposes(result)) {
      result[2] *= 2;
      result[1] = 0;
      result[0] = 0;
    } else if (isDerniers(result)) {
      result[2] *= 2;
      result[1] = result[0];
      result[0] = 0;
    } else if (isPremiers(result)) {
      if (result[2] === 0) {
        result[2] = result[1] * 2;
        result[1] = 0;
        result[0] = 0;
      } else {
        result[1] *= 2;
        result[0] = 0;
      }
    } else {
      if (result[2] === 0 && result[0] !== 0 && result[1] !== 0) {
        result[2] = result[1];
        result[1] = result[0];
        result[0] = 0;
      } else if (result[1] === 0 && result[0] !== 0 && result[2] !== 0) {
        result[1] = result[0];
        result[0] = 0;
      } else if (result[1] !== 0 && result[0] === 0 && result[2] === 0) {
        result[2] = result[1];
        result[1] = 0;
      } else if (result[0] !== 0 && result[1] === 0 && result[2] === 0) {
        result[2] = result[0];
        result[1] = 0;
        result[0] = 0;
      }
    }
    return result;
  }, []);

  const moveBoard = useCallback((direction) => {
    if (gameOver) return;
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      let changed = false;

      const processRow = (start, step) => {
        const row = [newBoard[start], newBoard[start + step], newBoard[start + 2 * step]];
        const shiftedRow = addition(row);
        if (JSON.stringify(row) !== JSON.stringify(shiftedRow)) {
          changed = true;
          newBoard[start] = shiftedRow[0];
          newBoard[start + step] = shiftedRow[1];
          newBoard[start + 2 * step] = shiftedRow[2];
        }
      };

      switch (direction) {
        case 'ArrowLeft':
          for (let i = 2; i < 9; i += 3) processRow(i, -1);
          break;
        case 'ArrowRight':
          
          for (let i = 0; i < 9; i += 3) processRow(i, 1);
          break;
        case 'ArrowUp':
          for (let i = 6; i < 9; i++) processRow(i, -3);  
          break;
        case 'ArrowDown':
          for (let i = 0; i < 3; i++) processRow(i, 3);  
          break;
        default:
          return prevBoard;
      }

      if (changed) {
        setLastMove(direction);
      }
      return changed ? newBoard : prevBoard;
    });
  }, [addition, gameOver]);

  const addElement = useCallback(() => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      const emptyIndices = newBoard.reduce((acc, val, idx) => val === 0 ? [...acc, idx] : acc, []);
      if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newValue = Math.random() >= 0.9 ? 4 : 2;
        newBoard[randomIndex] = newValue;
      }
      return newBoard;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        moveBoard(e.key);
      }
    };

    if (gameStarted) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [moveBoard, gameStarted]);

  useEffect(() => {
    if (gameStarted && lastMove) {
      addElement();
      setLastMove(null);
    }
    //i should add an else case to cover the end of the game
  }, [gameStarted, lastMove, addElement]);

  useEffect(() => {
    if (!gameOver && gameStarted) {
      const isOver = isGameOver();
      if (isOver) {
        setGameOver(true);
        const score = board.reduce((sum, value) => sum + value, 0);
        const prevScore = localStorage.getItem('score')
        if (typeof(prevScore) === 'number') {
          if (score > prevScore) {
            localStorage.setItem('score', score);
          }
        }
        console.log('Game over! Score:', score);
        console.log('best score : ', prevScore);
      }
    }
  }, [board, gameStarted, gameOver, isGameOver])

  const initializeGame = useCallback(() => {
    const newBoard = Array(9).fill(0);
    for (let i = 0; i < 2; i++) {
      const emptyIndices = newBoard.reduce((acc, val, idx) => val === 0 ? [...acc, idx] : acc, []);
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      newBoard[randomIndex] = Math.random() >= 0.9 ? 4 : 2;
    }
    setBoard(newBoard);
    setGameStarted(true);
    setLastMove(null);
  }, []);

  const restartGame = () => {
    setGameStarted(false);
    setTimeout(initializeGame, 0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const colorize = (val) => {
        switch(val) {
            case 0:
              return '#e5e5e5';
            case 2:
              return '#ffba08';
            case 4:
              return '#faa307';
            case 8:
              return '#f48c06';
            case 16:
              return '#e85d04';
            case 32:
              return '#dc2f02';
            case 64:
              return '#d00000';
            case 128:
              return '#9d0208';
            case 256:
              return '#6a040f';
            case 512:
              return  '#ffba08';
            default:
                return '#cdc1b5';
        }
  }

  return (
    <div className="tictactoe flex flex-col justify-center items-center">
      <h1>512</h1>
      <div className='boardContainer flex flex-col justify-center items-center w-32 h-32'>
      <div className="board grid grid-cols-3">
        {board.map((value, index) => (
          <div key={index} className="cell border-black border-solid border-2 flex justify-center items-center text-3xl" style={{backgroundColor:colorize(value)}}>
            {value}
          </div>
        ))}
      </div>
      </div>
      <p className="message">Score: {board.reduce((sum, value) => sum + value, 0)}</p>
      <button className="restart" onClick={restartGame}>Restart</button>
    </div>
  )
}

export default App;