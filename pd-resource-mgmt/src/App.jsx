import React from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import DesignerCard from './components/DesignerCard';
import './App.css';

function AppContent() {
  const { designers } = useResource();

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => console.log('Settings clicked')} />

      <div className="app-container">
        <h2 style={{ marginBottom: '1rem' }}>Designer Card Test</h2>
        <div className="designer-grid">
          {designers.slice(0, 3).map(designer => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onClick={() => console.log('Clicked:', designer.name)}
            />
          ))}
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
