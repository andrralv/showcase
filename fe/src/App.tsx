import { useState } from 'react';
import Bento from './components/Bento';

import './App.css'

function App() {
  const [attempts, setAttempts] = useState<number>(3);
  return (
    <>
      <div className="instructions">
        <p>You have won an all inclusive holiday trip to one of these attractive destinations. You only need to correctly guess the city you're going to!</p>
        <p> You have up to three attempts to guess the correct city!</p>
        <p>You have (<strong style={{ color: 'red' }}>{attempts}</strong>) attempts left.</p>
      </div>
      <Bento {...{ attempts, setAttempts }} />
    </>
  )
}

export default App
