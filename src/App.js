import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(0));

  function isOpposes(liste) {
    return liste[0] === liste[2] && liste[1] === 0 && liste[0] !== 0;
  }

  function isPremiers(liste) {
    return liste[0] === liste[1] && liste[0] !== 0;
  }

  function isDerniers(liste) {
    return liste[1] === liste[2] && liste[1] !== 0;
  }

  function addition(liste) {
    if (isOpposes(liste)) {
      liste[2] *= 2;
      liste[1] = 0;
      liste[0] = 0;
    } else if (isDerniers(liste)) {
      liste[2] *= 2;
      liste[1] = liste[0];
      liste[0] = 0;
    } else if (isPremiers(liste)) {
      if (liste[2] === 0) {
        liste[2] = liste[1] * 2;
        liste[1] = 0;
        liste[0] = 0;
      } else {
        liste[1] *= 2;
        liste[0] = 0;
      }
    } else {
      if (liste[2] === 0 && liste[0] !== 0 && liste[1] !== 0) {
        liste[2] = liste[1];
        liste[1] = liste[0];
        liste[0] = 0;
      } else if (liste[1] === 0 && liste[0] !== 0 && liste[2] !== 0) {
        liste[1] = liste[0];
        liste[0] = 0;
      } else if (liste[1] !== 0 && liste[0] === 0 && liste[2] === 0) {
        liste[2] = liste[1];
        liste[1] = 0;
        liste[0] = 0;
      } else if (liste[0] !== 0 && liste[1] === 0 && liste[2] === 0) {
        liste[2] = liste[0];
        liste[1] = 0;
        liste[0] = 0;
      }
    }
    return liste;
  }

  const moveBoard = (e) => {

    switch (e.key) {
      case 'ArrowLeft':
        for (let i = board.length - 1; i > 0; i -= 3) {
          let arr = [board[i], board[i - 1], board[i - 2]].map(Number);
          let shifted = addition(arr);
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[i] = shifted[0];
            newBoard[i - 1] = shifted[1];
            newBoard[i - 2] = shifted[2];
            return newBoard;
          });
        }
        break;

      case "ArrowRight":
        for (let i = 0; i < board.length; i += 3) {
          let arr = [board[i], board[i + 1], board[i + 2]].map(Number);
          let shifted = addition(arr);
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[i] = shifted[0];
            newBoard[i + 1] = shifted[1];
            newBoard[i + 2] = shifted[2];
            return newBoard;
          });
        }
        break;

      case "ArrowUp":
        for (let i = board.length - 1; i > 5; i -= 1) {
          let arr = [board[i], board[i - 3], board[i - 6]].map(Number);
          let shifted = addition(arr);
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[i] = shifted[0];
            newBoard[i - 3] = shifted[1];
            newBoard[i - 6] = shifted[2];
            return newBoard;
          });
        }
        break;

      case "ArrowDown":
        for (let i = 0; i < board.length - 6; i += 1) {
          let arr = [board[i], board[i + 3], board[i + 6]].map(Number);
          let shifted = addition(arr);
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[i] = shifted[0];
            newBoard[i + 3] = shifted[1];
            newBoard[i + 6] = shifted[2];
            return newBoard;
          });
        }
        break;

      default:
        break;
    }
  }

  function randomRoundNumber() {
    return Math.random() >= 0.9 ? 4 : 2;
  }

  const addElement = (board) => {

    let twoOrFour = randomRoundNumber();
    let emptyIndices = board.reduce((acc, val, idx) => val === 0 ? [...acc, idx] : acc, []);
    if (emptyIndices.length > 0) {
      let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[randomIndex] = twoOrFour;
        return newBoard;
      });
    }
  }

  const colorize = (val) => {
    let elem;
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
                break;
        }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {

      moveBoard(e);
      addElement(board);
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  const restartGame = () => {
    setBoard(Array(9).fill(0));
  }

  return (
    <div className="tictactoe flex flex-col justify-center items-center">
      <h1>2048 Game</h1>
      <div className="board grid grid-cols-3 w-28 h-28">
        {board.map((value, index) => (
          <div key={index} className="cell border-black border-solid border flex justify-center items-center text-3xl" style={{backgroundColor:colorize(value)}}>
            {value !== 0 ? value : ''}
          </div>
        ))}
      </div>
      <p className="message">Score: {board.reduce((sum, value) => sum + value, 0)}</p>
      <button className="restart" onClick={restartGame}>Restart</button>
    </div>
  )
}

export default App;