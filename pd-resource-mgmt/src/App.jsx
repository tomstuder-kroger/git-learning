import React, { useState } from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import DesignerGrid from './components/DesignerGrid';
import DesignerEditModal from './components/DesignerEditModal';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { currentView } = useResource();

  const handleDesignerClick = (designer) => {
    setSelectedDesigner(designer);
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedDesigner(null);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedDesigner(null);
  };

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        {currentView === 'individual' && (
          <DesignerGrid
            onDesignerClick={handleDesignerClick}
            onAddClick={handleAddClick}
          />
        )}

        {currentView === 'summary' && (
          <div className="kds-Card kds-Card--m kds-card-section">
            <h2>Team Summary</h2>
            <p>Coming in next tasks</p>
          </div>
        )}
      </div>

      <DesignerEditModal
        designer={selectedDesigner}
        isOpen={editModalOpen}
        onClose={handleCloseModal}
      />
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
