import './App.css';
import React, { useState } from 'react';

function App() {

  const [board, setBoard] = useState(Array(9).fill(2));

  function isOpposes (liste) {
    //x-0-x 
    if (liste[0] == liste[2] && liste[1] == 0 && liste[0] != 0) {
        return true;
    }
    else {
        return false;
    }
  }
  function isPremiers (liste) {
    if (liste[0] == liste[1] && liste[0] != 0) {
        return true;
    }
    else {
        return false;
    }
  }
  function isDerniers (liste) {
    //y-x-x
    if (liste[1] == liste[2] && liste[1] != 0) {
        return true;
    }
    else {
        return false;
    }
  }
  function addition(liste) {
    if (isOpposes(liste)) {
      // console.log('opposés : ', liste)
      liste[2] *= 2;
      liste[1] = 0;
      liste[0] = 0;
      
      return liste;
    }
    //fonctionne
    if (isDerniers(liste)) {
      // console.log('derniers', liste);
      liste[2] *= 2;
      liste[1] = liste[0];
      liste[0] = 0;
      
      return liste;
    }
    //fonctionne
    if(isPremiers(liste)) {
      // console.log('premiers : ', liste)
      if (liste[2] == 0) {
          liste[2] = liste[1]*2;
          liste[1] = 0;
          liste[0] = 0;
      }
      else {
          liste[1] *= 2;
          liste[0] = 0;
      }
    }
    //si aucun doublons
    else {
      // 2-4-0 => 0-2-4
      if (liste[2] == 0 && liste[0]!=0 && liste[1]!=0) {
          liste[2] = liste[1];
          liste[1] = liste[0];
          liste[0] = 0;
      }
      // 2-0-4 => 0-2-4
      else if (liste[1] == 0 && liste[0] != 0 && liste[2] != 0) {
          liste[1] = liste[0];
          liste[0] = 0;
      }
      //ici on teste les cas de figure où on a 2*0 sur la mm ligne
      else {
          //0-2-0
          if (liste[1]!=0 && liste[0]==0 && liste[2]==0) {
              liste[2] = liste[1];
              liste[1] = 0;
              liste[0] = 0;
          }
          //2-0-0
          else if(liste[0]!=0 && liste[1]==0 && liste[2]==0) {
              liste[2]=liste[0];
              liste[1]=0;
              liste[0]=0;
          }
      }
    }
  return liste;
  }

  const moveBoard = (e) => {
    switch(e.key) {
      case 'ArrowLeft' :
        for (let i=board.length-1; i>0; i-=3) {
          let firstElem = board[i];
          let secondElem = board[i-1];
          let thirdElem = board[i-2];
          
          let arr = [parseInt(firstElem), parseInt(secondElem), parseInt(thirdElem)];
          let shifted = addition(arr);

          // firstElem = shifted[0];
          // secondElem = shifted[1];
          // thirdElem = shifted[2];
          
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[i] = shifted[0];
            newBoard[i-1] = shifted[1];
            newBoard[i-2] = shifted[2];
            return newBoard;
          });

          console.log(board)
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
