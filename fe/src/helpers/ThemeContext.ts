import { createContext, Dispatch, SetStateAction } from 'react';


type ThemeContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'body-light',
  setTheme: () => {},
});

export default ThemeContext;