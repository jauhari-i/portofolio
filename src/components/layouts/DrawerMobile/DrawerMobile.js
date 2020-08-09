import React, { useContext } from 'react';
import './style.css';
import { AppContext } from '../../../contexts';
import { Link, useLocation } from 'react-router-dom';

import { Instagram, Twitter, MailRounded, CloseRounded } from '@material-ui/icons';

const DrawerMobile = ({ children }) => {
  const { openDrawer, setOpenDrawer } = useContext(AppContext);
  const location = useLocation();
  const closeDrawer = (e) => {
    e.preventDefault();
    setOpenDrawer(false);
  };

  return (
    <div>
      {openDrawer ? (
        <div className="mobile-drawer">
          <div className="row space brand">
            <h1>Heni Yunar L.</h1>
            <CloseRounded onClick={(e) => closeDrawer(e)} />
          </div>
          <ul className="mobile-nav">
            <li>
              <Link
                to={process.env.PUBLIC_URL + '/'}
                className={location.pathname === process.env.PUBLIC_URL + '/' ? 'active' : ''}
              >
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={process.env.PUBLIC_URL + '/albums'}
                className={location.pathname === process.env.PUBLIC_URL + '/albums' ? 'active' : ''}
              >
                <span>Albums</span>
              </Link>
            </li>
            <li>
              <Link
                to={process.env.PUBLIC_URL + '/gallery'}
                className={
                  location.pathname === process.env.PUBLIC_URL + '/gallery' ? 'active' : ''
                }
              >
                <span>Gallery</span>
              </Link>
            </li>
            <li>
              <Link
                to={process.env.PUBLIC_URL + '/about'}
                className={location.pathname === process.env.PUBLIC_URL + '/about' ? 'active' : ''}
              >
                <span>About Me</span>
              </Link>
            </li>
          </ul>
          <div className="mobile-footer">
            <div className="row">
              <a
                href="https://www.instagram.com/lunarlarasa"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram fontSize="small" />
              </a>
              <a
                href="https://www.twitter.com/lunarlarasa"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter fontSize="small" />
              </a>
              <a href="mailto:lunarlarasa@gmail.com" rel="noopener noreferrer" target="_blank">
                <MailRounded fontSize="small" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="mobile-content">{children}</div>
    </div>
  );
};

export default DrawerMobile;
