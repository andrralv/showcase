import { useState } from 'react';
import Bento from './components/Bento';
import Instructions from './components/Instructions';
import Header from './components/Header';
import ThemeContext from './helpers/ThemeContext';

import './App.css'

function App() {
  const [theme, setTheme] = useState('body-light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <Header />
        <Instructions />
        <Bento />
      </div>
    </ThemeContext.Provider>
  )
}

export default App;
