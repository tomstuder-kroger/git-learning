import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import './Header.css';

function Header({ onSettingsClick }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title-section">
          <h1 className="app-title">Manager Time Logger</h1>
          <p className="user-info">
            {APP_CONFIG.userProfile.name} - {APP_CONFIG.userProfile.title}
          </p>
        </div>
        <button
          className="settings-button"
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          <kds-icon-settings size="m" />
        </button>
      </div>
    </header>
  );
}

export default Header;
