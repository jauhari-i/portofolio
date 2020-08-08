import React from 'react';
import './style.scss';

const NotFound = () => {
  return (
    <div class="container">
      <div class="boo-wrapper">
        <h1>Whoops!</h1>
        <br />

        <p>
          We couldn't find the page you
          <br />
          were looking for.
        </p>
        <p>404</p>
      </div>
    </div>
  );
};

export default NotFound;
