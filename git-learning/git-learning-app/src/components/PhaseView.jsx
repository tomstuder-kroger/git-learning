import React from 'react';
import SessionCard from './SessionCard';
import ProgressBar from './ProgressBar';

export default function PhaseView({ phase }) {
  const percentComplete = phase.timeEstimate > 0
    ? Math.round((phase.timeSpent / phase.timeEstimate) * 100)
    : 0;

  return (
    <div className="phase-view" id={`phase-${phase.id}`}>
      <div className="phase-header">
        <h2>
          Phase {phase.id}: {phase.name}
        </h2>
        <div className="phase-meta">
          <ProgressBar
            current={phase.timeSpent}
            total={phase.timeEstimate}
            variant={phase.status === 'complete' ? 'success' : 'default'}
          />
          <p className="phase-time">
            {phase.timeSpent}/{phase.timeEstimate} minutes
          </p>
        </div>
      </div>

      <div className="sessions-list">
        {phase.sessions && phase.sessions.length > 0 ? (
          phase.sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <p className="no-sessions">No sessions available</p>
        )}
      </div>
    </div>
  );
}
