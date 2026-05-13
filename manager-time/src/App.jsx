import React, { useState } from 'react';
import { APP_CONFIG } from './config/appConfig';
import Navigation from './components/Navigation';
import TimeEntry from './components/TimeEntry';
import TableView from './components/TableView';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import NotificationContainer from './components/NotificationContainer';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('entry');
  const [showSettings, setShowSettings] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'entry':
        return <TimeEntry />;
      case 'table':
        return <TableView />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <TimeEntry />;
    }
  };

  return (
    <>
      <NotificationContainer />
      <mx-vertical-nav>
        {/* App title and settings button in center-block (blue header) */}
        <div slot="center-block" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span className="mx-vertical-nav__app-title" style={{ marginLeft: '16px' }}>
            Manager Time Logger
          </span>
          <button
            className="settings-button"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
            style={{ marginLeft: 'auto' }}
          >
            <kds-icon-settings size="m"></kds-icon-settings>
          </button>
        </div>

        {/* User avatar with initials */}
        <span slot="user">TS</span>
        <div slot="user-full-name">{APP_CONFIG.userProfile.name}</div>

        <mx-layout layout-type="full-page" css-classes='{"container": "pt-24"}'>
          {/* Title slot - user name and title */}
          <div slot="title">
            {APP_CONFIG.userProfile.name} - {APP_CONFIG.userProfile.title}
          </div>

          {/* Navigation tabs */}
          <Navigation currentView={currentView} onViewChange={setCurrentView} />

          {/* Page content */}
          <main className="app-content">
            {renderView()}
          </main>
        </mx-layout>
      </mx-vertical-nav>

      {/* Settings modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

export default App;
