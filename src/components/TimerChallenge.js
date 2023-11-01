import React, {useState, useRef} from 'react'
import ResultModal from './ResultModal.js'

function TimerChallenge({title, targetTime}) {

 const timer = useRef()   
 const dialog = useRef()

    
const [timerRemaining, setTimerRemaining] = useState(targetTime * 1000)

const timerIsActive = timerRemaining > 0 && timerRemaining < targetTime * 1000 

if(timerRemaining <= 0 ){
  clearInterval(timer.current);
  dialog.current.open()
}

  const handleReset = () => {
    setTimerRemaining(targetTime * 1000 )
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
     setTimerRemaining(prevTimeRemaining => prevTimeRemaining - 10);   
    },10)
    
  }

  const handleStop = () => {
    dialog.current.open()
    clearInterval(timer.current)
  }
  return (
    <>
     <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timerRemaining} onReset={handleReset}/>  
    <section className='challenge'>TimerChallenge
    <h2>{title}</h2>
    
    <p className='challenge-time'>
         {targetTime} second{targetTime > 1? "s" : ''}
    </p>
    <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? 'stop' : 'start' }  challenge
        </button>
    </p>
     <p className={timerIsActive ? 'active' : undefined}>
         {timerIsActive ? 'time is running...' : 'timer inactive'}
     </p>

    </section>
    </>
  )
}

export default TimerChallenge