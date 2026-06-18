import React from 'react';
import { KdsButton, KdsIconSettings, KdsIconDownload } from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';

function GlobalNavBar({ onSettingsClick }) {
  const { currentView, setCurrentView, exportData } = useResource();

  return (
    <div style={{
      background: '#0F52A2',
      color: 'white',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.25rem',
          fontWeight: 600,
          fontFamily: 'Nunito, sans-serif'
        }}>
          Design Resource Management
        </h1>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('individual')}
            style={{
              background: currentView === 'individual' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: currentView === 'individual' ? 600 : 400,
              transition: 'background 0.2s'
            }}
          >
            Individual Designers
          </button>

          <button
            onClick={() => setCurrentView('summary')}
            style={{
              background: currentView === 'summary' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: currentView === 'summary' ? 600 : 400,
              transition: 'background 0.2s'
            }}
          >
            Team Summary
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          onClick={exportData}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
          title="Export Data"
        >
          <KdsIconDownload size="s" />
        </button>

        <button
          onClick={onSettingsClick}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Settings"
        >
          <KdsIconSettings size="s" />
        </button>
      </div>
    </div>
  );
}

export default GlobalNavBar;
