import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';
import {
  HomeRounded,
  Photo,
  PhotoAlbumRounded,
  AccountCircleRounded,
  MoreHorizRounded,
  Instagram,
  Twitter,
  MailRounded,
} from '@material-ui/icons';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Sidebar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const openPopper = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setOpen(!open);
  };

  const closePopper = () => {
    setOpen(false);
  };

  return (
    <div className="root">
      <nav className="navbar">
        <div className="brand">
          <h1 className="resp">H</h1>
          <h1>Heni Yunar L.</h1>
        </div>
        <ul className="navbar-nav">
          <li>
            <Link
              to={process.env.PUBLIC_URL + '/'}
              className={location.pathname === process.env.PUBLIC_URL + '/' ? 'active' : ''}
            >
              <div className="icon">
                <HomeRounded />
              </div>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={process.env.PUBLIC_URL + '/albums'}
              className={location.pathname === process.env.PUBLIC_URL + '/albums' ? 'active' : ''}
            >
              <div className="icon">
                <PhotoAlbumRounded />
              </div>
              <span>Albums</span>
            </Link>
          </li>
          <li>
            <Link
              to={process.env.PUBLIC_URL + '/gallery'}
              className={location.pathname === process.env.PUBLIC_URL + '/gallery' ? 'active' : ''}
            >
              <div className="icon">
                <Photo />
              </div>
              <span>Gallery</span>
            </Link>
          </li>
          <li>
            <Link
              to={process.env.PUBLIC_URL + '/about'}
              className={location.pathname === process.env.PUBLIC_URL + '/about' ? 'active' : ''}
            >
              <div className="icon">
                <AccountCircleRounded />
              </div>
              <span>About Me</span>
            </Link>
          </li>
        </ul>
        <div className="navbar-footer">
          <div className="footer">
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
          <div className="footer-mobile">
            <div className="more" onClick={(e) => openPopper(e)}>
              <MoreHorizRounded />
            </div>
          </div>
        </div>
      </nav>
      <Popper open={open} anchorEl={anchorEl} placement={'right'} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={closePopper}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="mobile-link">
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
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <div className="main">{children}</div>
    </div>
  );
};

export default Sidebar;
