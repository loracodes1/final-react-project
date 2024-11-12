import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Recipe Book App</h1>
      <nav>
        <Link to="/">Recipe List</Link>
        <Link to="/add">Add Recipe</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
