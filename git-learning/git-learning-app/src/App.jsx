import React, { useState, useEffect } from 'react';
import { KdsMessage } from 'react-mx-web-components';
import Sidebar from './components/Sidebar';
import PhaseView from './components/PhaseView';
import { parseMarkdown } from './utils/markdownParser';
import markdownContent from '../../git-learning-complete.md?raw';

function App() {
  const [data, setData] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const parsed = parseMarkdown(markdownContent);
      setData(parsed);
    } catch (err) {
      console.error('Failed to parse markdown:', err);
      setError('Could not load learning content. Please check git-learning-complete.md');
    }
  }, []);

  const handlePhaseClick = (phaseId) => {
    setCurrentPhase(phaseId);
    // Scroll to phase
    const element = document.getElementById(`phase-${phaseId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (error) {
    return (
      <div className="app-container">
        <KdsMessage variant="error">{error}</KdsMessage>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        overall={data.overall}
        phases={data.phases}
        currentPhase={currentPhase}
        onPhaseClick={handlePhaseClick}
      />
      <main className="main-content">
        <header className="app-header">
          <h1>Git Learning Progress Tracker</h1>
          <p className="app-subtitle">
            Learn Git and GitHub safely with Claude Code
          </p>
        </header>

        <div className="phases-container">
          {data.phases.map((phase) => (
            <PhaseView key={phase.id} phase={phase} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
