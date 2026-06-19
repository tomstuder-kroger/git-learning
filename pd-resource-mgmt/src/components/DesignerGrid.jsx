import React, { useMemo } from 'react';
import { KdsButton, MxSingleSelect, KdsIconPlus } from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';
import DesignerCard from './DesignerCard';
import { calculateUtilization, calculateMonthlyRunRate } from '../utils/calculations';

function DesignerGrid({ onDesignerClick, onAddClick }) {
  const {
    designers,
    productTeams,
    portfolios,
    capacitySettings,
    filterLevel,
    filterStatus,
    filterPortfolio,
    sortBy,
    setFilters,
    setSortBy
  } = useResource();

  // Filter designers
  const filteredDesigners = useMemo(() => {
    return designers.filter(designer => {
      if (filterLevel && designer.level !== filterLevel) return false;
      if (filterStatus && designer.employmentStatus !== filterStatus) return false;

      if (filterPortfolio) {
        // Check if designer is allocated to any team in this portfolio
        const portfolioTeamIds = productTeams
          .filter(t => t.portfolioId === filterPortfolio)
          .map(t => t.id);

        const hasAllocation = designer.allocations.some(a =>
          portfolioTeamIds.includes(a.productTeamId)
        );

        if (!hasAllocation) return false;
      }

      return true;
    });
  }, [designers, filterLevel, filterStatus, filterPortfolio, productTeams]);

  // Sort designers
  const sortedDesigners = useMemo(() => {
    const sorted = [...filteredDesigners];

    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'utilization':
        sorted.sort((a, b) => {
          const utilizationA = calculateUtilization(a, capacitySettings);
          const utilizationB = calculateUtilization(b, capacitySettings);
          return utilizationB - utilizationA; // Descending
        });
        break;
      case 'runRate':
        sorted.sort((a, b) => {
          const rateA = calculateMonthlyRunRate(a, capacitySettings);
          const rateB = calculateMonthlyRunRate(b, capacitySettings);
          return rateB - rateA; // Descending
        });
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredDesigners, sortBy, capacitySettings]);

  return (
    <div>
      <div className="controls-bar">
        <div className="controls-bar-left">
          <KdsButton kind="primary" onClick={onAddClick}>
            <KdsIconPlus size="s" /> Add Designer
          </KdsButton>
        </div>

        <div className="controls-bar-right">
          <MxSingleSelect
            label="Filter by Level"
            items={['All', 'APD', 'PD', 'SPD']}
            value={filterLevel || 'All'}
            emitOnlyValue
            onValueUpdate={(e) => setFilters({ level: e.detail === 'All' ? null : e.detail })}
            style={{ width: '150px' }}
          />

          <MxSingleSelect
            label="Filter by Status"
            items={['All', 'FTE', 'SOW', 'SOW Koncert']}
            value={filterStatus || 'All'}
            emitOnlyValue
            onValueUpdate={(e) => setFilters({ status: e.detail === 'All' ? null : e.detail })}
            style={{ width: '180px' }}
          />

          <MxSingleSelect
            label="Filter by Portfolio"
            items={['All', ...portfolios.map(p => p.name)]}
            value={filterPortfolio ? portfolios.find(p => p.id === filterPortfolio)?.name : 'All'}
            emitOnlyValue
            onValueUpdate={(e) => {
              if (e.detail === 'All') {
                setFilters({ portfolio: null });
              } else {
                const portfolio = portfolios.find(p => p.name === e.detail);
                setFilters({ portfolio: portfolio?.id });
              }
            }}
            style={{ width: '180px' }}
          />

          <MxSingleSelect
            label="Sort by"
            items={['Name', 'Utilization', 'Run Rate']}
            value={sortBy === 'name' ? 'Name' : sortBy === 'utilization' ? 'Utilization' : 'Run Rate'}
            emitOnlyValue
            onValueUpdate={(e) => {
              const sortMap = { 'Name': 'name', 'Utilization': 'utilization', 'Run Rate': 'runRate' };
              setSortBy(sortMap[e.detail]);
            }}
            style={{ width: '150px' }}
          />
        </div>
      </div>

      {sortedDesigners.length === 0 ? (
        <div className="kds-Card kds-Card--m kds-card-section" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
            No designers found
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
            {designers.length === 0
              ? 'Get started by importing from Capacity Planning or adding designers manually'
              : 'Try adjusting your filters'
            }
          </div>
          {designers.length === 0 && (
            <KdsButton kind="primary" onClick={onAddClick}>
              <KdsIconPlus size="s" /> Add Designer
            </KdsButton>
          )}
        </div>
      ) : (
        <div className="designer-grid">
          {sortedDesigners.map(designer => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onClick={() => onDesignerClick(designer)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DesignerGrid;
