import React from 'react';

export default function ProgressBar({ current, total, variant = 'default' }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  const color = variant === 'success' ? '#008060' : '#0071ce';

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <span className="progress-bar-text">{percent}%</span>
    </div>
  );
}
