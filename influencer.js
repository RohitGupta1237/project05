import React from 'react';
import './influencer.css';

function LoginPage() {
  return (
    <div className="LoginPage">
      <h1>Welcome!</h1>
      <div className="buttons">
        <button className="button new-user-button">New User</button>
        <button className="button already-user-button">Already User</button>
      </div>
    </div>
  );
}

export default LoginPage;
