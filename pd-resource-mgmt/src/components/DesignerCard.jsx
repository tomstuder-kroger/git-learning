import React from 'react';
import { KdsTag } from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';
import {
  calculateUtilization,
  calculateMonthlyRunRate,
  getUtilizationColor
} from '../utils/calculations';

function DesignerCard({ designer, onClick }) {
  const { capacitySettings, productTeams } = useResource();

  const utilization = calculateUtilization(designer, capacitySettings);
  const monthlyRunRate = calculateMonthlyRunRate(designer, capacitySettings);
  const utilizationColor = getUtilizationColor(utilization);

  const getRoleLabel = (level) => {
    const labels = {
      APD: 'Associate Product Designer',
      PD: 'Product Designer',
      SPD: 'Senior Product Designer'
    };
    return labels[level] || level;
  };

  return (
    <div
      className="kds-Card kds-Card--m kds-card-section designer-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#000',
          marginBottom: '4px'
        }}>
          {designer.name}
        </div>

        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          {getRoleLabel(designer.level)} ({designer.level})
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <KdsTag kind="default">{designer.employmentStatus}</KdsTag>
      </div>

      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 700,
          fontFamily: 'Nunito, sans-serif',
          lineHeight: 1,
          color: utilizationColor
        }}>
          {utilization.toFixed(0)}%
        </div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
          Capacity
        </div>
      </div>

      {designer.allocations.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            Allocations
          </div>
          {designer.allocations.map(allocation => {
            const team = productTeams.find(t => t.id === allocation.productTeamId);
            return (
              <div key={allocation.productTeamId} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                marginBottom: '0.25rem',
                color: '#374151'
              }}>
                <span>{team?.name || 'Unknown Team'}</span>
                <span style={{ fontWeight: 600 }}>{allocation.percentage}%</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: '0.75rem',
        marginTop: '0.75rem'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
          Monthly Run Rate
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>
          ${monthlyRunRate.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
}

export default DesignerCard;
