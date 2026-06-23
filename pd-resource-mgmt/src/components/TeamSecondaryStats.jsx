import React from 'react';

function TeamSecondaryStats({
  totalHoursAvailable,
  totalHoursAllocated,
  headcountByLevel,
  averageRunRatePerDesigner
}) {
  return (
    <div className="team-secondary-stats">
      <div className="stat-item">
        <div className="stat-label">Total Hours Available</div>
        <div className="stat-value">{totalHoursAvailable.toLocaleString()} hours</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Total Hours Allocated</div>
        <div className="stat-value">{totalHoursAllocated.toLocaleString()} hours</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Headcount by Level</div>
        <div className="stat-value">
          {headcountByLevel.APD} APD, {headcountByLevel.PD} PD, {headcountByLevel.SPD} SPD
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Avg Run Rate per Designer</div>
        <div className="stat-value">${averageRunRatePerDesigner.toLocaleString()}/mo</div>
      </div>
    </div>
  );
}

export default TeamSecondaryStats;
