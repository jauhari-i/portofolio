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
  Facebook,
  WhatsApp,
} from '@material-ui/icons';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

const Sidebar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const openPopper = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setOpen(!open);
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
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <div className="icon">
                <HomeRounded />
              </div>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/albums" className={location.pathname === '/albums' ? 'active' : ''}>
              <div className="icon">
                <PhotoAlbumRounded />
              </div>
              <span>Albums</span>
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
              <div className="icon">
                <Photo />
              </div>
              <span>Gallery</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
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
              <Link>
                <WhatsApp fontSize="small" />
              </Link>
              <Link>
                <Instagram fontSize="small" />
              </Link>
              <Link>
                <Facebook fontSize="small" />
              </Link>
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
          <Fade {...TransitionProps} timeout={350}>
            <Paper className="mobile-link">
              <div className="row">
                <Link>
                  <WhatsApp fontSize="small" />
                </Link>
                <Link>
                  <Instagram fontSize="small" />
                </Link>
                <Link>
                  <Facebook fontSize="small" />
                </Link>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
      <div className="main">{children}</div>
    </div>
  );
};

export default Sidebar;
