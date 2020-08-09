import React, { useState, useContext } from 'react';
import { SearchRounded } from '@material-ui/icons';
import './style.css';

import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { MenuRounded } from '@material-ui/icons';
import { AppContext } from '../../../contexts';

const PageHeader = ({ search, title, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { mobile, openDrawer, setOpenDrawer } = useContext(AppContext);

  const openPopper = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setOpen(!open);
  };

  const closePopper = () => {
    setOpen(false);
  };

  return (
    <div className="header-root">
      <div className="row space">
        {mobile && (
          <div
            className="mobile-menu"
            onClick={(e) => {
              e.preventDefault();
              setOpenDrawer(!openDrawer);
            }}
          >
            <MenuRounded />
          </div>
        )}
        <div className="page-title">{mobile ? <h2>{title}</h2> : <h1>{title}</h1>}</div>
        {search ? (
          <>
            <div className="search">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-2">
                    <SearchRounded />
                  </div>
                  <div className="col-sm-8">
                    <input
                      autoComplete="off"
                      aria-autocomplete="none"
                      type="text"
                      name="search"
                      id="search"
                      onChange={(e) => onChange(e)}
                      placeholder="Search..."
                      className="search-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="search-mobile" onClick={(e) => openPopper(e)}>
              <SearchRounded />
            </div>
          </>
        ) : (
          <div />
        )}
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={'left'} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={closePopper}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ padding: '1rem' }}>
                <input
                  autoComplete="off"
                  aria-autocomplete="none"
                  type="text"
                  name="search"
                  id="search"
                  onChange={(e) => onChange(e)}
                  placeholder="Search..."
                  className="search-input"
                />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
};

export default PageHeader;
