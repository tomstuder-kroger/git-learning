import React from 'react';
import { KdsTag } from 'react-mx-web-components';
import ProgressBar from './ProgressBar';

export default function Sidebar({ overall, phases, currentPhase, onPhaseClick }) {
  const getStatusIcon = (status) => {
    if (status === 'complete') return '✓';
    if (status === 'in-progress') return '→';
    return '⬜';
  };

  const getStatusVariant = (status) => {
    if (status === 'complete') return 'success';
    if (status === 'in-progress') return 'info';
    return 'default';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Git Learning</h2>
        <p className="sidebar-subtitle">Progress Tracker</p>
      </div>

      <div className="progress-overall">
        <h3>Overall Progress</h3>
        <ProgressBar
          current={overall.completedTime}
          total={overall.totalTime}
          variant={overall.percentComplete === 100 ? 'success' : 'default'}
        />
        <p className="progress-time">
          {overall.completedTime}/{overall.totalTime} minutes
        </p>
      </div>

      <nav className="phase-nav">
        <h3>Phases</h3>
        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`phase-nav-item ${currentPhase === phase.id ? 'active' : ''}`}
            onClick={() => onPhaseClick(phase.id)}
          >
            <KdsTag variant={getStatusVariant(phase.status)} size="small">
              {getStatusIcon(phase.status)}
            </KdsTag>
            <div className="phase-nav-info">
              <div className="phase-nav-title">
                Phase {phase.id}: {phase.name}
              </div>
              <div className="phase-nav-time">
                {phase.timeSpent}/{phase.timeEstimate}m
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
