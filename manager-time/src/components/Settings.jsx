import React from 'react';
import './Settings.css';

function Settings({ onClose }) {
  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="settings-content">
          <p>Settings panel will be built here...</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
