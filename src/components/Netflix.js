import React from 'react';
import './Netflix.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setSearchTerm }) => {
  return (
    <div className="navbar">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="netflix-logo"
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
    </div>
  );
};

export default Navbar;

