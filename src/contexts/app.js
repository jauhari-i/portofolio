import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export default function AppContextProvider({ children }) {
  const [mobile, setMobile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const value = {
    mobile,
    setMobile,
    openDrawer,
    setOpenDrawer,
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    if (width <= 425) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
