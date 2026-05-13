import React, { useState } from 'react';
import { KdsButton, KdsTag, KdsMessage } from 'react-mx-web-components';
import CommandBlock from './CommandBlock';
import ResourceLink from './ResourceLink';

export default function SessionCard({ session }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusVariant = (status) => {
    if (status === 'complete') return 'success';
    if (status === 'in-progress') return 'info';
    return 'default';
  };

  const getStatusIcon = (status) => {
    if (status === 'complete') return '✓';
    if (status === 'in-progress') return '→';
    return '⬜';
  };

  return (
    <div className={`session-card ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="session-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="session-info">
          <KdsTag variant={getStatusVariant(session.status)} size="small">
            {getStatusIcon(session.status)}
          </KdsTag>
          <h4>Session {session.id}: {session.name}</h4>
        </div>
        <div className="session-meta">
          <span className="session-time">⏱️ {session.totalTime}m</span>
          <KdsButton variant="tertiary" size="small">
            {isExpanded ? 'Collapse' : 'Expand'}
          </KdsButton>
        </div>
      </div>

      {isExpanded && (
        <div className="session-content">
          {/* Time breakdown */}
          {(session.learningTime > 0 || session.practiceTime > 0) && (
            <div className="session-time-detail">
              {session.learningTime > 0 && <span>📚 Learning: {session.learningTime}m</span>}
              {session.practiceTime > 0 && <span>💻 Practice: {session.practiceTime}m</span>}
              <span>Total: {session.totalTime}m</span>
            </div>
          )}

          {/* Learning Objectives */}
          {session.objectives && session.objectives.length > 0 && (
            <section className="session-section">
              <h5>📚 Learning Objectives</h5>
              <ul className="objectives-list">
                {session.objectives.map((obj, idx) => (
                  <li key={idx}>
                    <span className="checkbox">☐</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Resources */}
          {session.resources && session.resources.length > 0 && (
            <section className="session-section">
              <h5>📖 Resources</h5>
              <div className="resources-list">
                {session.resources.map((resource, idx) => (
                  <ResourceLink key={idx} {...resource} />
                ))}
              </div>
            </section>
          )}

          {/* Hands-On Exercise */}
          {session.exercise && (session.exercise.steps.length > 0 || session.exercise.commands.length > 0) && (
            <section className="session-section">
              <h5>💻 Hands-On Exercise</h5>

              {session.exercise.steps.length > 0 && (
                <div className="exercise-steps">
                  {session.exercise.steps.map((step, idx) => (
                    <div key={idx} className="exercise-step">
                      <strong>Step {idx + 1}:</strong> {step}
                    </div>
                  ))}
                </div>
              )}

              {session.exercise.commands.length > 0 && (
                <div className="exercise-commands">
                  {session.exercise.commands.map((cmd, idx) => (
                    <CommandBlock key={idx} command={cmd} />
                  ))}
                </div>
              )}

              <KdsMessage variant="info" className="exercise-tip">
                💡 TIP: Click the "Copy" button to copy commands to your clipboard
              </KdsMessage>
            </section>
          )}

          {/* Reflection Questions */}
          {session.reflectionQuestions && session.reflectionQuestions.length > 0 && (
            <section className="session-section">
              <h5>🤔 Reflection Questions</h5>
              <ul className="reflection-list">
                {session.reflectionQuestions.map((question, idx) => (
                  <li key={idx}>{question}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
