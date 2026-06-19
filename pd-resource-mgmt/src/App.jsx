import React, { useState } from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import DesignerGrid from './components/DesignerGrid';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const { currentView } = useResource();

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        {currentView === 'individual' && (
          <DesignerGrid
            onDesignerClick={(designer) => setSelectedDesigner(designer)}
            onAddClick={() => console.log('Add designer')}
          />
        )}

        {currentView === 'summary' && (
          <div className="kds-Card kds-Card--m kds-card-section">
            <h2>Team Summary</h2>
            <p>Coming in next tasks</p>
          </div>
        )}
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
