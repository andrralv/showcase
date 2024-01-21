import { useContext } from 'react';
import ThemeContext from '../helpers/ThemeContext';

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const contextHandler = () => {
    if (themeContext.theme === 'body-dark') {
      themeContext.setTheme('body-light')
    } else {
      themeContext.setTheme('body-dark')
    }
  }
  return (
    <div className="app-header">
      <button onClick={contextHandler}>{themeContext.theme === 'body-dark' ? '☀️' : '🌒'}</button>
    </div>)
}

export default Header;