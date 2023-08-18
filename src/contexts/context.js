import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {

	const [activeMenu, setActiveMenu] = useState(true);
	  const [screenSize, setScreenSize] = useState(undefined);
	   const [isClicked, setIsClicked] = useState(initialState);
     const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);

      const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClose = (clicked) => {

    setIsClicked({ ...initialState, [clicked]: false });
    console.log(clicked,isClicked)

  }

	const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{currentColor, handleClose,currentMode, screenSize, setScreenSize, activeMenu,setActiveMenu,handleClick,setIsClicked, isClicked,setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);