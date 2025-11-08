import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">🎫 Ticket Support System</h1>
          <p className="header-subtitle">Manage and track customer complaints efficiently</p>
        </div>
      </div>
    </header>
  );
};

export default Header;