import React from 'react';

function TeamMetricCards({
  totalMonthlyRunRate,
  averageUtilization,
  totalOutcomesValue,
  overallROI,
  incompleteTeamsCount,
  totalTeamsCount
}) {
  const getUtilizationColor = (utilization) => {
    if (utilization < 70) return '#9ca3af';
    if (utilization <= 100) return '#2e7d32';
    return '#d32f2f';
  };

  const getROIColor = (roi) => {
    if (roi === null) return '#9ca3af';
    return roi >= 100 ? '#2e7d32' : '#d32f2f';
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="team-metric-cards">
      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: '#000',
            lineHeight: 1
          }}
        >
          ${formatCurrency(totalMonthlyRunRate)}
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Monthly
        </div>
        <div
          className="metric-tertiary"
          style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}
        >
          Annual: ${formatCurrency(totalMonthlyRunRate * 12)}
        </div>
      </div>

      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: getUtilizationColor(averageUtilization),
            lineHeight: 1
          }}
        >
          {averageUtilization.toFixed(0)}%
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Average Utilization
        </div>
        <div
          className="metric-tertiary"
          style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}
        >
          Target: 80%
        </div>
      </div>

      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: totalOutcomesValue ? '#000' : '#9ca3af',
            lineHeight: 1
          }}
        >
          {totalOutcomesValue ? `$${formatCurrency(totalOutcomesValue)}` : 'Incomplete Data'}
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Total Value Delivered
        </div>
        <div
          className="metric-tertiary"
          style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}
        >
          {incompleteTeamsCount > 0
            ? `${totalTeamsCount - incompleteTeamsCount} of ${totalTeamsCount} teams tracked`
            : 'All teams tracked ✓'}
        </div>
      </div>

      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: getROIColor(overallROI),
            lineHeight: 1
          }}
        >
          {overallROI !== null ? `${overallROI.toFixed(1)}%` : 'Incomplete Data'}
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Return on Investment
        </div>
      </div>
    </div>
  );
}

export default TeamMetricCards;
