import React from 'react';
import { KdsButton } from 'react-mx-web-components';

export default function ResourceLink({ type, title, url, time }) {
  const icon = type === 'reading' ? '📖' : '🎥';

  return (
    <div className="resource-item">
      <span className="resource-info">
        <span className="resource-icon">{icon}</span>
        <span className="resource-title">{title}</span>
        <span className="resource-time">({time}m)</span>
      </span>
      <KdsButton
        variant="secondary"
        size="small"
        onClick={() => window.open(url, '_blank')}
      >
        Open Link →
      </KdsButton>
    </div>
  );
}
