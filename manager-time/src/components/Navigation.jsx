import React from 'react';
import './Navigation.css';

function Navigation({ currentView, onViewChange }) {
  const tabs = [
    { id: 'entry', label: 'Time Entry' },
    { id: 'table', label: 'Table View' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <nav className="app-navigation">
      <div className="nav-content">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${currentView === tab.id ? 'active' : ''}`}
            onClick={() => onViewChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
