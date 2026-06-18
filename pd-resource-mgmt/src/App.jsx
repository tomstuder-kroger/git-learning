import React, { useState } from 'react';
import { ResourceProvider } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        <div className="kds-Card kds-Card--m kds-card-section">
          <h2>Placeholder - Views coming next</h2>
          <p>Navigation is working. Individual Designers and Team Summary pages will be implemented in subsequent tasks.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
