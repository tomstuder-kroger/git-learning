import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getInitialData } from '../data/placeholderData';
import { saveData, loadData } from '../utils/storage';

const ResourceContext = createContext();

export function useResource() {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResource must be used within ResourceProvider');
  }
  return context;
}

export function ResourceProvider({ children }) {
  // Initialize state from localStorage or placeholder data
  const [state, setState] = useState(() => {
    const stored = loadData();
    if (stored) {
      return {
        designers: stored.designers || [],
        productTeams: stored.productTeams || [],
        portfolios: stored.portfolios || [],
        capacitySettings: stored.capacitySettings || {},
        outcomes: stored.outcomes || {},
        currentView: 'individual',
        filterLevel: null,
        filterStatus: null,
        filterPortfolio: null,
        sortBy: 'name'
      };
    }

    const initial = getInitialData();
    return {
      ...initial,
      outcomes: {},
      currentView: 'individual',
      filterLevel: null,
      filterStatus: null,
      filterPortfolio: null,
      sortBy: 'name'
    };
  });

  // Auto-save to localStorage whenever state changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData({
        designers: state.designers,
        productTeams: state.productTeams,
        portfolios: state.portfolios,
        capacitySettings: state.capacitySettings,
        outcomes: state.outcomes
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [state.designers, state.productTeams, state.portfolios, state.capacitySettings, state.outcomes]);

  // Designer actions
  const addDesigner = useCallback((designer) => {
    const newDesigner = {
      id: uuidv4(),
      ...designer,
      allocations: designer.allocations || []
    };
    setState(prev => ({
      ...prev,
      designers: [...prev.designers, newDesigner]
    }));
  }, []);

  const updateDesigner = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      designers: prev.designers.map(d =>
        d.id === id ? { ...d, ...updates } : d
      )
    }));
  }, []);

  const deleteDesigner = useCallback((id) => {
    setState(prev => ({
      ...prev,
      designers: prev.designers.filter(d => d.id !== id)
    }));
  }, []);

  // Product Team actions
  const addProductTeam = useCallback((team) => {
    const newTeam = {
      id: uuidv4(),
      ...team
    };
    setState(prev => ({
      ...prev,
      productTeams: [...prev.productTeams, newTeam]
    }));
  }, []);

  const updateProductTeam = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      productTeams: prev.productTeams.map(t =>
        t.id === id ? { ...t, ...updates } : t
      )
    }));
  }, []);

  const deleteProductTeam = useCallback((id) => {
    setState(prev => ({
      ...prev,
      productTeams: prev.productTeams.filter(t => t.id !== id),
      // Remove allocations to this team from all designers
      designers: prev.designers.map(d => ({
        ...d,
        allocations: d.allocations.filter(a => a.productTeamId !== id)
      }))
    }));
  }, []);

  // Portfolio actions
  const addPortfolio = useCallback((portfolio) => {
    const newPortfolio = {
      id: uuidv4(),
      ...portfolio
    };
    setState(prev => ({
      ...prev,
      portfolios: [...prev.portfolios, newPortfolio]
    }));
  }, []);

  const updatePortfolio = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      portfolios: prev.portfolios.map(p =>
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  }, []);

  const deletePortfolio = useCallback((id) => {
    setState(prev => {
      // Check if any teams belong to this portfolio
      const hasTeams = prev.productTeams.some(t => t.portfolioId === id);
      if (hasTeams) {
        throw new Error('Cannot delete portfolio with teams');
      }

      return {
        ...prev,
        portfolios: prev.portfolios.filter(p => p.id !== id)
      };
    });
  }, []);

  // Settings actions
  const updateCapacitySettings = useCallback((settings) => {
    setState(prev => ({
      ...prev,
      capacitySettings: { ...prev.capacitySettings, ...settings }
    }));
  }, []);

  const updateOutcomes = useCallback((teamId, value) => {
    setState(prev => ({
      ...prev,
      outcomes: {
        ...prev.outcomes,
        [teamId]: value
      }
    }));
  }, []);

  // View actions
  const setCurrentView = useCallback((view) => {
    setState(prev => ({ ...prev, currentView: view }));
  }, []);

  const setFilters = useCallback(({ level, status, portfolio }) => {
    setState(prev => ({
      ...prev,
      filterLevel: level !== undefined ? level : prev.filterLevel,
      filterStatus: status !== undefined ? status : prev.filterStatus,
      filterPortfolio: portfolio !== undefined ? portfolio : prev.filterPortfolio
    }));
  }, []);

  const setSortBy = useCallback((sortBy) => {
    setState(prev => ({ ...prev, sortBy }));
  }, []);

  // Data management actions
  const exportData = useCallback(() => {
    const { exportToJSON } = require('../utils/storage');
    const today = new Date().toISOString().split('T')[0];
    exportToJSON(
      {
        designers: state.designers,
        productTeams: state.productTeams,
        portfolios: state.portfolios,
        capacitySettings: state.capacitySettings,
        outcomes: state.outcomes
      },
      `pd-resource-mgmt-backup-${today}`
    );
  }, [state]);

  const importData = useCallback(async (file) => {
    const { importFromJSON } = require('../utils/storage');
    const data = await importFromJSON(file);

    setState(prev => ({
      ...prev,
      designers: data.designers || [],
      productTeams: data.productTeams || [],
      portfolios: data.portfolios || [],
      capacitySettings: data.capacitySettings || prev.capacitySettings,
      outcomes: data.outcomes || {}
    }));
  }, []);

  const resetToPlaceholder = useCallback(() => {
    const initial = getInitialData();
    setState(prev => ({
      ...prev,
      ...initial
    }));
  }, []);

  const value = {
    // State
    designers: state.designers,
    productTeams: state.productTeams,
    portfolios: state.portfolios,
    capacitySettings: state.capacitySettings,
    outcomes: state.outcomes,
    currentView: state.currentView,
    filterLevel: state.filterLevel,
    filterStatus: state.filterStatus,
    filterPortfolio: state.filterPortfolio,
    sortBy: state.sortBy,

    // Actions
    addDesigner,
    updateDesigner,
    deleteDesigner,
    addProductTeam,
    updateProductTeam,
    deleteProductTeam,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    updateCapacitySettings,
    updateOutcomes,
    setCurrentView,
    setFilters,
    setSortBy,
    exportData,
    importData,
    resetToPlaceholder
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}
