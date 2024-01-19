import { useState, useRef } from 'react';
import Bento from './components/Bento';
import Instructions from './components/Instructions';

import './App.css'

function App() {
  const attemptsRef = useRef(3);
  const [displayedAttempts, setDisplayedAttempts] = useState(attemptsRef.current);

  const updateAttempts = () => {
    attemptsRef.current -= 1;
    setDisplayedAttempts(attemptsRef.current);
  };

  return (
    <>
      <Instructions attempts={displayedAttempts} />
      <Bento updateAttempts={updateAttempts} />
    </>
  )
}

export default App
