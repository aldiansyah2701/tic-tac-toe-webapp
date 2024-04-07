import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    // Create a link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://getbootstrap.com/2.3.2/assets/css/bootstrap.css';

    // Append the link element to the head of the document
    document.head.appendChild(link);

    // Clean up function to remove the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };

  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  const initialBoard = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
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
      if (validation('o')
        // Add other winning conditions here...
      ) {
        alert('O wins');
        setOWin(oWin + 1);
        resetBoard();
      } else if (
        validation('x')
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

  const validation = param => {

    return (
      document.getElementById('one').classList.contains(param) &&
      document.getElementById('two').classList.contains(param) &&
      document.getElementById('three').classList.contains(param) ||

      document.getElementById('four').classList.contains(param) &&
      document.getElementById('five').classList.contains(param) &&
      document.getElementById('six').classList.contains(param) ||

      document.getElementById('seven').classList.contains(param) &&
      document.getElementById('eight').classList.contains(param) &&
      document.getElementById('nine').classList.contains(param) ||

      document.getElementById('one').classList.contains(param) &&
      document.getElementById('four').classList.contains(param) &&
      document.getElementById('seven').classList.contains(param) ||

      document.getElementById('two').classList.contains(param) &&
      document.getElementById('five').classList.contains(param) &&
      document.getElementById('eight').classList.contains(param) ||

      document.getElementById('three').classList.contains(param) &&
      document.getElementById('six').classList.contains(param) &&
      document.getElementById('nine').classList.contains(param) ||

      document.getElementById('one').classList.contains(param) &&
      document.getElementById('five').classList.contains(param) &&
      document.getElementById('nine').classList.contains(param) ||

      document.getElementById('three').classList.contains(param) &&
      document.getElementById('five').classList.contains(param) &&
      document.getElementById('seven').classList.contains(param)
    );
  }

  const resetBoard = () => {
    const elements = document.querySelectorAll('#game li');
    elements.forEach((element) => {
      element.innerText = '+';
      element.classList.remove('disable', 'o', 'x', 'btn-primary', 'btn-info');
    });
    setCount(0);
  };

  const boardItem = () => {
    return initialBoard.map(data => {
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
            <ul class="row" id="game" style={{ marginLeft: -50 + 'px' }}>
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
