import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  
  const [sizeboard, setSizeboard] = useState(3); // bisa diganti ganti sesuai scale
  // 3 > -100
  // 4 > -150
  // 5 > -200
  // 6 > -250
  // 7 > -400
  // 8 > -500
  // 9 > -550
  const [marginboard, setMarginboard] = useState(-100);

   // Define the size of the Tic Tac Toe board
  //  const size = 3; // Change this value for different board sizes

 
   // Create state for the board
   const [initboard, setInitboard] = useState(Array(sizeboard * sizeboard).fill(''));

  useEffect(() => {
    // Create a link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://getbootstrap.com/2.3.2/assets/css/bootstrap.css';

    // Append the link element to the head of the document
    document.head.appendChild(link);

    
    const rowCondition = [];
    for (let i = 0; i < sizeboard; i++) {
      for (let j = 0; j < sizeboard; j++) {
        rowCondition.push(`cell-${i}-${j}`);
        
      }
    }
    setInitboard(rowCondition);

    // Clean up function to remove the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };

  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  // const initialBoard = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const [count, setCount] = useState(0);
  const [oWin, setOWin] = useState(0);
  const [xWin, setXWin] = useState(0);


  const handleClick = (event) => {
    const target = event.target;
    if (target.classList.contains('disable')) {
      alert('Already selected');
    } else {
      setCount(count + 1);
      if (count % 2 === 0) {
        target.innerText = 'o';
        target.classList.add('disable', 'o', 'btn-primary');
      } else {
        target.innerText = 'x';
        target.classList.add('disable', 'x', 'btn-info');
      }

      // Check for winning conditions
      if (validationDinamis('o', sizeboard)
        // Add other winning conditions here...
      ) {
        alert('O wins');
        setOWin(oWin + 1);
        resetBoard();
      } else if (
        validationDinamis('x', sizeboard)
        // Add other winning conditions here...
      ) {
        alert('X wins');
        setXWin(xWin + 1);
        resetBoard();
      } else if (count === 9) {
        alert('It\'s a tie. It will restart.');
        resetBoard();
      }
    }
  };

  // const validation = param => {

  //   return (
  //     document.getElementById('one').classList.contains(param) &&
  //     document.getElementById('two').classList.contains(param) &&
  //     document.getElementById('three').classList.contains(param) ||

  //     document.getElementById('four').classList.contains(param) &&
  //     document.getElementById('five').classList.contains(param) &&
  //     document.getElementById('six').classList.contains(param) ||

  //     document.getElementById('seven').classList.contains(param) &&
  //     document.getElementById('eight').classList.contains(param) &&
  //     document.getElementById('nine').classList.contains(param) ||

  //     document.getElementById('one').classList.contains(param) &&
  //     document.getElementById('four').classList.contains(param) &&
  //     document.getElementById('seven').classList.contains(param) ||

  //     document.getElementById('two').classList.contains(param) &&
  //     document.getElementById('five').classList.contains(param) &&
  //     document.getElementById('eight').classList.contains(param) ||

  //     document.getElementById('three').classList.contains(param) &&
  //     document.getElementById('six').classList.contains(param) &&
  //     document.getElementById('nine').classList.contains(param) ||

  //     document.getElementById('one').classList.contains(param) &&
  //     document.getElementById('five').classList.contains(param) &&
  //     document.getElementById('nine').classList.contains(param) ||

  //     document.getElementById('three').classList.contains(param) &&
  //     document.getElementById('five').classList.contains(param) &&
  //     document.getElementById('seven').classList.contains(param)
  //   );
  // }

  const validationDinamis = (param, size) => {
    const winConditions = [];

    // Function to check if all elements in an array have a certain class
    const checkAllClass = (elements, className) => elements.every(element => element.classList.contains(className));

    // Generate winning conditions for rows
    for (let i = 0; i < size; i++) {
      const rowCondition = [];
      for (let j = 0; j < size; j++) {
        
        rowCondition.push(document.getElementById(`cell-${i}-${j}`));
        console.log( "row" + `cell-${i}-${j}`);
      }
      winConditions.push(rowCondition);
    }

    // console.log("rows " + winConditions);

    // Generate winning conditions for columns
    for (let j = 0; j < size; j++) {
      const colCondition = [];
      for (let i = 0; i < size; i++) {
        colCondition.push(document.getElementById(`cell-${i}-${j}`));
      }
      winConditions.push(colCondition);
    }

    console.log("col " + winConditions);
    // Generate winning conditions for diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(document.getElementById(`cell-${i}-${i}`));
      diagonal2.push(document.getElementById(`cell-${i}-${size - 1 - i}`));
    }
    winConditions.push(diagonal1, diagonal2);

    console.log("diagonal " + winConditions);

    // Check if any of the winning conditions have all elements with the given class (param)
    return winConditions.some(condition => checkAllClass(condition, param));
  };

  const resetBoard = () => {
    const elements = document.querySelectorAll('#game li');
    elements.forEach((element) => {
      element.innerText = '+';
      element.classList.remove('disable', 'o', 'x', 'btn-primary', 'btn-info');
    });
    setCount(0);
  };

  const boardItem = () => {
    console.log(initboard);
    return initboard.map(data => {
      console.log("data " + data);
      return (
        <li onClick={handleClick} class="btn span1" id={data}>+</li>
      );
    });
  }

  return (
    <div className="App">

      <body>
        <div id="tic-tac-toe">
          <div class="span3 new_span">
            <div class="row">
              <h1 class="span3">Tic Tac Toe</h1>
              <div class="span3">

                <div class="input-prepend input-append">
                  <span class="add-on win_text">O won</span><strong id="o_win" class="win_times add-on">{oWin}</strong><span class="add-on">time(s)</span>
                </div>
                <div class="input-prepend input-append">
                  <span class="add-on win_text">X won</span><strong id="x_win" class="win_times add-on">{xWin}</strong><span class="add-on">time(s)</span>
                </div>

              </div>



            </div>
            <ul class="row" id="game" style={{ marginLeft: marginboard + 'px' }}>
              {boardItem()}

            </ul>
            <div class="clr">&nbsp;</div>

            <div class="row">
              <button id="reset" onClick={resetBoard}>Reset</button>
            </div>
          </div>
        </div>
        <script src='https://code.jquery.com/jquery-1.7.2.min.js'></script>



        <script src="js/index.js"></script>

      </body>

    </div>
  );
}

export default App;
