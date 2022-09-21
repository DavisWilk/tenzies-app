import React from "react"
import logo from './logo.svg';
import './App.css';
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Stats from './components/Stats'







function App() {

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)
  const [time,setTime] = React.useState(0)
  const [startGame,setStartGame] = React.useState(false)
  const [rollCount,setRollCount] = React.useState(0)

  // Timer Creator
  React.useEffect(() => {
    if(startGame){
      const interval = setInterval(() => {
        setTime(num => num+1);
      }, 1000);
      return () => clearInterval(interval);
    }
    }, [startGame]);

  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setStartGame(false)
            scoreDisplay()
            console.log("You won!")
        } 
  },[dice])

  function newGame(){
    setTenzies(false)
    setDice(allNewDice())
    setTime(0)
    setRollCount(0)
  }

  function scoreDisplay(){
    let oldScore = []
    let newScore = {
      rolls: {rollCount},
      time: {time}
    }
    localStorage.getItem("highScore") ? 
    oldScore = JSON.parse(localStorage.getItem("highScore")) :
    localStorage.setItem("highScore",JSON.stringify(newScore))

    if(oldScore === false || oldScore.rolls.rollCount === 0){
      console.log("New Record")
      localStorage.setItem("highScore", JSON.stringify(newScore))
    }else if(newScore.rolls.rollCount < oldScore.rolls.rollCount){
      console.log(oldScore)
      console.log(newScore)
      console.log("You beat your old score!")
      localStorage.setItem("highScore", JSON.stringify(newScore))
    }else if(newScore.rolls.rollCount === oldScore.rolls.rollCount){
      if(newScore.rolls.time < oldScore.rolls.time){
        console.log("You tied your old score but did faster!")
        localStorage.setItem("highScore", JSON.stringify(newScore))
        } else {
        console.log("You tied your old score but not quite as fast. Better luck next time!")
        }
    }else {
      console.log(newScore)
      console.log(oldScore.rolls.rollCount)
      console.log(oldScore)
      console.log("Your old score is still higher")}

  }


  function generateNewDie(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    let newDiceArray = []
      for(let i=0 ; i< 10; i++){
        
        newDiceArray.push(generateNewDie())
      }
    return newDiceArray
  }

  let diceArray = dice.map(item => <Die value={item.value} key={item.id} isHeld={item.isHeld} holdDice={()=> holdDice(item.id)}/>)

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die,isHeld: !die.isHeld} :
      die
    }))
  }

  function rollDice(){
    setRollCount(num => num += 1)

    setDice(oldDice => oldDice.map(die => {
        setStartGame(true)
      return die.isHeld ? die : generateNewDie()}))
  }


  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {diceArray}
        </div>
        <Stats time={time} rollCount={rollCount}/>
        <button onClick={tenzies ? newGame : rollDice} className="roll-dice">{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}

export default App;

//   Local:            http://localhost:3000/
  // On Your Network:  http://192.168.0.185:3000/