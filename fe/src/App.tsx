import { useState } from 'react';
import Bento from './components/Bento';
import { ApolloProvider } from '@apollo/client';
import Instructions from './components/Instructions';
import Header from './components/Header';
import ThemeContext from './helpers/ThemeContext';
import client from './api/client';

import './App.css'

function App() {
  const [theme, setTheme] = useState('body-light');
  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={theme}>
          <Header />
          <Instructions />
          <Bento />
        </div>
      </ThemeContext.Provider>
    </ApolloProvider>
  )
}

export default App;
