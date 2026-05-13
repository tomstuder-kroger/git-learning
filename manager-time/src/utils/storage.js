// LocalStorage utilities for Manager Time Logger

const STORAGE_KEYS = {
  ENTRIES: 'manager-time-logger-entries',
  CONFIG: 'manager-time-logger-config',
  LEARNED_VALUES: 'manager-time-logger-learned-values'
};

/**
 * Get all time entries from localStorage
 * @returns {Array} Array of time entries
 */
export function getEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading entries:', error);
    return [];
  }
}

/**
 * Save time entries to localStorage
 * @param {Array} entries - Array of time entries
 */
export function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries:', error);
  }
}

/**
 * Add a new time entry
 * @param {Object} entry - Time entry object
 * @returns {Object} The saved entry with id and timestamps
 */
export function addEntry(entry) {
  const entries = getEntries();
  const newEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  entries.push(newEntry);
  saveEntries(entries);
  return newEntry;
}

/**
 * Update an existing time entry
 * @param {string} id - Entry ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated entry or null if not found
 */
export function updateEntry(id, updates) {
  const entries = getEntries();
  const index = entries.findIndex(e => e.id === id);
  if (index === -1) return null;

  entries[index] = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveEntries(entries);
  return entries[index];
}

/**
 * Delete a time entry
 * @param {string} id - Entry ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteEntry(id) {
  const entries = getEntries();
  const filtered = entries.filter(e => e.id !== id);
  if (filtered.length === entries.length) return false;
  saveEntries(filtered);
  return true;
}

/**
 * Get learned values (frequently used custom field values)
 * @returns {Object} Learned values by field name
 */
export function getLearnedValues() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LEARNED_VALUES);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading learned values:', error);
    return {};
  }
}

/**
 * Save learned values
 * @param {Object} learnedValues - Learned values by field name
 */
export function saveLearnedValues(learnedValues) {
  try {
    localStorage.setItem(STORAGE_KEYS.LEARNED_VALUES, JSON.stringify(learnedValues));
  } catch (error) {
    console.error('Error saving learned values:', error);
  }
}

/**
 * Learn a new value for a custom field
 * @param {string} fieldName - Field name (e.g., 'participant')
 * @param {string} value - Value to learn
 */
export function learnValue(fieldName, value) {
  if (!value || !value.trim()) return;

  const learned = getLearnedValues();
  if (!learned[fieldName]) {
    learned[fieldName] = [];
  }

  // Add to front if not already present
  const trimmedValue = value.trim();
  const existing = learned[fieldName].filter(v => v !== trimmedValue);
  learned[fieldName] = [trimmedValue, ...existing].slice(0, 10); // Keep top 10

  saveLearnedValues(learned);
}

/**
 * Get user configuration
 * @returns {Object} User configuration
 */
export function getConfig() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

/**
 * Save user configuration
 * @param {Object} config - User configuration
 */
export function saveConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

/**
 * Generate a unique ID for entries
 * @returns {string} Unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Export all data as JSON
 * @returns {Object} All data
 */
export function exportData() {
  return {
    entries: getEntries(),
    config: getConfig(),
    learnedValues: getLearnedValues(),
    exportedAt: new Date().toISOString()
  };
}

/**
 * Import data from JSON
 * @param {Object} data - Data to import
 * @returns {boolean} Success status
 */
export function importData(data) {
  try {
    if (data.entries) saveEntries(data.entries);
    if (data.config) saveConfig(data.config);
    if (data.learnedValues) saveLearnedValues(data.learnedValues);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}
