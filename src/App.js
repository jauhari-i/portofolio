import React, { useEffect, useState } from 'react';
import './assets/css/base.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sidebar from './components/layouts/Sidebar';
import Home from './pages/Home';
import Album from './pages/Album';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NotFound from './pages/NotFound';
import DrawerMobile from './components/layouts/DrawerMobile';
import ContextProvider from './contexts';

export const ContentDesktop = () => {
  return (
    <Sidebar>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
        <Route exact path={process.env.PUBLIC_URL + '/albums'} component={Album} />
        <Route exact path={process.env.PUBLIC_URL + '/gallery'} component={Gallery} />
        <Route exact path={process.env.PUBLIC_URL + '/about'} component={About} />
        <Route exact component={NotFound} />
      </Switch>
    </Sidebar>
  );
};

export const ContentMobile = () => {
  return (
    <DrawerMobile>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
        <Route exact path={process.env.PUBLIC_URL + '/albums'} component={Album} />
        <Route exact path={process.env.PUBLIC_URL + '/gallery'} component={Gallery} />
        <Route exact path={process.env.PUBLIC_URL + '/about'} component={About} />
        <Route exact component={NotFound} />
      </Switch>
    </DrawerMobile>
  );
};

const App = ({ store }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  return (
    <Provider store={store}>
      <ContextProvider>
        <BrowserRouter>{width <= 425 ? <ContentMobile /> : <ContentDesktop />}</BrowserRouter>
      </ContextProvider>
    </Provider>
  );
};

export default App;
