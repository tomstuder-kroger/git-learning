const STORAGE_KEY = 'pd-resource-mgmt-data';
const VERSION = 1;

/**
 * Save data to localStorage
 */
export function saveData(data) {
  try {
    const dataWithVersion = {
      ...data,
      version: VERSION,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

/**
 * Load data from localStorage
 */
export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error('Failed to load data:', error);
    return null;
  }
}

/**
 * Clear all data from localStorage
 */
export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export data as JSON file download
 */
export function exportToJSON(data, filename) {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
}

/**
 * Import data from JSON file
 */
export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
