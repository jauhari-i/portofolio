import React from 'react';
import { SearchRounded } from '@material-ui/icons';
import './style.css';

const PageHeader = ({ search, title, onChange }) => {
  return (
    <div className="header-root">
      <div className="row space">
        <div className="page-title">
          <h1>{title}</h1>
        </div>
        {search ? (
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
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default PageHeader;
