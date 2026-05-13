import { useState, useEffect, useMemo } from 'react';
import { getEntries } from '../utils/storage';
import { calculateSummaryStats } from '../utils/chartHelpers';
import TaskTypeChart from './charts/TaskTypeChart';
import ImpactDistributionChart from './charts/ImpactDistributionChart';
import RoleExpectationsChart from './charts/RoleExpectationsChart';
import WorkloadByDayChart from './charts/WorkloadByDayChart';
import MeetingVsFocusTimeCard from './MeetingVsFocusTimeCard';
import NotesSummary from './NotesSummary';
import './Dashboard.css';

function Dashboard() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all, week, month, quarter

  // Force refresh of entries on component mount to get latest imported data
  const [allEntries, setAllEntries] = useState([]);

  // Load entries on component mount and when view changes
  useEffect(() => {
    setAllEntries(getEntries());
  }, []);

  // Calculate date range based on filter mode
  const getDateRange = () => {
    const today = new Date();
    let from, to;

    switch (filterMode) {
      case 'week': {
        to = new Date(today);
        from = new Date(today);
        from.setDate(from.getDate() - from.getDay() + (from.getDay() === 0 ? -6 : 1)); // Monday
        break;
      }
      case 'month': {
        to = new Date(today);
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      }
      case 'quarter': {
        const quarter = Math.floor(today.getMonth() / 3);
        from = new Date(today.getFullYear(), quarter * 3, 1);
        to = new Date(today.getFullYear(), quarter * 3 + 3, 0);
        break;
      }
      default: // all
        return { from: null, to: null };
    }

    return {
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    };
  };

  // Apply filters
  const filteredEntries = useMemo(() => {
    let result = [...allEntries];

    // Apply date range from manual input if provided
    if (dateFrom) {
      result = result.filter(e => e.date >= dateFrom);
    }
    if (dateTo) {
      result = result.filter(e => e.date <= dateTo);
    }

    // Apply quick filter
    if (filterMode !== 'all' && !dateFrom && !dateTo) {
      const range = getDateRange();
      if (range.from) {
        result = result.filter(e => e.date >= range.from);
      }
      if (range.to) {
        result = result.filter(e => e.date <= range.to);
      }
    }

    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [allEntries, dateFrom, dateTo, filterMode]);

  const stats = useMemo(() => calculateSummaryStats(filteredEntries), [filteredEntries]);

  const handleClearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setFilterMode('all');
  };

  const handleQuickFilter = (mode) => {
    setFilterMode(mode);
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="dashboard">
      {/* Filter Section */}
      <div className="dashboard-filters">
        <div className="filter-header">
          <h2>Dashboard</h2>
          <kds-button
            type="button"
            kind="secondary"
            onClick={handleClearFilters}
          >
            Reset Filters
          </kds-button>
        </div>

        {/* Date Range Inputs */}
        <div className="filter-group date-inputs">
          <div className="date-input-pair">
            <label htmlFor="date-from" className="kds-Label">From</label>
            <input
              id="date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setFilterMode('custom');
              }}
              className="kds-Input"
            />
          </div>
          <div className="date-input-pair">
            <label htmlFor="date-to" className="kds-Label">To</label>
            <input
              id="date-to"
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setFilterMode('custom');
              }}
              className="kds-Input"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="quick-filters">
          <button
            type="button"
            className={`quick-filter-btn ${filterMode === 'week' && !dateFrom && !dateTo ? 'active' : ''}`}
            onClick={() => handleQuickFilter('week')}
          >
            This Week
          </button>
          <button
            type="button"
            className={`quick-filter-btn ${filterMode === 'month' && !dateFrom && !dateTo ? 'active' : ''}`}
            onClick={() => handleQuickFilter('month')}
          >
            This Month
          </button>
          <button
            type="button"
            className={`quick-filter-btn ${filterMode === 'quarter' && !dateFrom && !dateTo ? 'active' : ''}`}
            onClick={() => handleQuickFilter('quarter')}
          >
            This Quarter
          </button>
          <button
            type="button"
            className={`quick-filter-btn ${filterMode === 'all' && !dateFrom && !dateTo ? 'active' : ''}`}
            onClick={() => handleQuickFilter('all')}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Hours</div>
          <div className="stat-value">{stats.totalHours.toFixed(1)}h</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Entries</div>
          <div className="stat-value">{stats.entryCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg / Entry</div>
          <div className="stat-value">{stats.avgPerEntry.toFixed(1)}h</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">High Impact</div>
          <div className="stat-value stat-highlight">{stats.highImpactPercent}%</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-item">
          <TaskTypeChart entries={filteredEntries} />
        </div>
        <div className="chart-item">
          <ImpactDistributionChart entries={filteredEntries} />
        </div>
        <div className="chart-item">
          <RoleExpectationsChart entries={filteredEntries} />
        </div>
        <div className="chart-item">
          <WorkloadByDayChart entries={filteredEntries} />
        </div>
        <div className="chart-item">
          <MeetingVsFocusTimeCard entries={filteredEntries} />
        </div>
      </div>

      {/* Notes Summary */}
      <NotesSummary entries={filteredEntries} />
    </div>
  );
}

export default Dashboard;
