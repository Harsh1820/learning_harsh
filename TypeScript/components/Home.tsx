import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2 className="home-heading">Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="form-input" />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
}

export default Home;
