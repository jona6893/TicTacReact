import './App.css'
import { useState } from 'react';

function App() {
// holder styr på hvis tur det er.
const [player, setPlayer] = useState(null)
// holder styr på hvem der har vundet.
const [winner, setWinner] = useState(null)
// En Array vi opdater når et nyt felt er valgt.
const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
// bruges til at vide om en besked skal vises, med vinderes navn(X/O).
const [gameStatus, setGameStatus] = useState(false)
// En Array med Arrays, hver nummer passer til et felt på brættet. 0 er det først felt, 1 er det andet ovs..
const [winCondition, setWinCondition] = useState([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);
// start når men kilkker på et felt.
// i er feltes INDEX Nummer.
function ClickHandler(event,i) {
// bruges til a vide hvilket felt er blivet klikket på.
const setText = event.target;

// det ligesom en if/else, ville bare prøve at bruge den.
// så if (player er ligemed X eller O), så køre den en if/else statment.
switch (player) {
  case null: console.log("select X or O before begining");
  break;
  case "X":
    // tjekker om det valgte felt(ved brug a i) er tomt.
    if(board[i] === "") {
      // sætter feltes indhold til X
      setText.textContent = "X";
      // opdatere vores Array
      board[i] = "X"
      // skifter Spiller
      setPlayer("O");
      // starter en funktion det tjekker om personen har vundet.
      CheckWin()
    }
    console.log("already Selected");
    break
  case "O":
    // gør det samme som foroven, bare med "O"
    if (board[i] === "") {
      setText.textContent = "O";
      board[i] = "O";
      setPlayer("X");
      CheckWin();
    }
    console.log("already Selected")
    break
} 
console.log("currentPlayer is " + player)
console.log("current board is" + board)

}

function CheckWin() {
  console.log(player);
  //ForEach for vær Array inde i winCondition Array'en
  winCondition.forEach((condition) => {
    // her tjekker vi om feks. 3 X på strippe findes på brættet. Man kan google "JS tiktaktoe win condition" for en bedere forklaring
    if (
      board[condition[0]] === player &&
      (board[condition[1]] === player) & (board[condition[2]] === player)
    ) {
      return setWinner(player), setGameStatus(true);
    }
  });
}


  return (
    <>
    {/* knapper så man kan valge hvem der starter. */}
    <button onClick={() =>{setPlayer("X")}}>X</button>
    <button onClick={() =>{setPlayer("O")}}>O</button>
    {/* Besked der kommer frem når en vinder er fundet. */}
    {gameStatus ? <h1>{winner} Won The Game</h1>: null}
    {/* vores Bræt */}
    <div className="App">
      {/* hvert felt i vores bræt, Array(9) da vi skal havde 3x3 bræt */}
      {[...Array(9)].map((field, i) => (
        <div
          className="field"
          key={i}
          /* funktion der starter nåp feltet klikkes på. */
          onClick={() =>ClickHandler(event, i)}
        ></div>
      ))}
    </div></>
  );
}

export default App
