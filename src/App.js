import './App.css';
import React, { useState } from 'react';

function App() {

  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const moveBoard = (e) => {
    switch(e.key) {
      case 'ArrowLeft' :
        for (let i=board.length-1; i>0; i-=3) {
          let firstElem = board[i];
          let secondElem = board[i-1];
          let thirdElem = board[i-2];
          
          let arr = [parseInt(firstElem.innerText), parseInt(secondElem.innerText), parseInt(thirdElem.innerText)];
          //let shifted = addition(arr);

          firstElem += 3;
          secondElem += 5;
          thirdElem += 2;
          console.log('clickos')
      }

      break;
    }
  }

  const bodyListener = () => {
    document.body.addEventListener('keydown', (e) => {
      e.preventDefault();
      console.log('jappuie ', e);
      moveBoard(e);
    })
  }

  return (
    <>
      <div className="tictactoe flex flex-col justify-center items-center">
        <h1><button onClick={bodyListener}>JOUER</button></h1>
        <div class="board grid grid-cols-3 grid-cols-3 w-28 h-28">
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
            <div class="cell border-black border-solid border flex justify-center items-center text-3xl">0</div>
        </div>
        <p class="message">Score : </p>
        <button class="restart">Restart</button>
    </div>
    </>
  )
}

export default App;
