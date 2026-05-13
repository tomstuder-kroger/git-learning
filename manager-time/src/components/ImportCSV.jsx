import React, { useState, useRef } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { getEntries, saveEntries } from '../utils/storage';
import { useNotification } from '../context/NotificationContext';
import './ImportCSV.css';

function ImportCSV({ onClose, onImportComplete }) {
  const { showSuccess, showError, showWarning } = useNotification();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [importMode, setImportMode] = useState('merge'); // 'merge' or 'replace'
  const [isProcessing, setIsProcessing] = useState(false);

  function handleFileSelect(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      showError('Please select a CSV file');
      return;
    }

    setFile(selectedFile);
    parseCSVPreview(selectedFile);
  }

  function parseCSVPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());

      if (lines.length === 0) {
        showError('CSV file is empty');
        return;
      }

      // Parse first 5 rows for preview
      const previewLines = lines.slice(0, Math.min(6, lines.length)); // Header + 5 rows
      const parsedPreview = previewLines.map(line => parseCSVLine(line));

      setPreview(parsedPreview);
    };
    reader.onerror = () => {
      showError('Failed to read file');
    };
    reader.readAsText(file);
  }

  function parseCSVLine(line) {
    // Simple CSV parser - handles quoted fields
    const fields = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    fields.push(currentField.trim());

    return fields;
  }

  function mapCSVToEntry(csvRow, headers) {
    const entry = {};

    headers.forEach((header, index) => {
      const value = csvRow[index] || '';
      const headerLower = header.toLowerCase();

      // Map CSV columns to entry fields
      if (headerLower === 'date') {
        entry.date = value;
      } else if (headerLower.includes('task type')) {
        // Try to match task type label to ID
        const taskType = APP_CONFIG.taskTypes.find(
          t => t.label.toLowerCase() === value.toLowerCase()
        );
        entry.taskType = taskType ? taskType.id : value;
      } else if (headerLower.includes('time') || headerLower.includes('hours')) {
        entry.time = parseFloat(value) || 0;
      } else if (headerLower === 'category') {
        entry.category = value;
      } else if (headerLower.includes('task code')) {
        entry.taskCode = value;
      } else if (headerLower === 'portfolio') {
        entry.portfolio = value;
      } else if (headerLower === 'impact') {
        entry.impact = value;
      } else if (headerLower.includes('role expect')) {
        // Parse semicolon-separated role expectations
        entry.roleExpectations = value ? value.split(';').map(s => s.trim()).filter(Boolean) : [];
      } else if (headerLower === 'notes') {
        entry.notes = value;
      } else {
        // Store other fields in customFields
        if (!entry.customFields) entry.customFields = {};
        entry.customFields[header] = value;
      }
    });

    // Add timestamps and ID
    entry.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    entry.createdAt = new Date().toISOString();
    entry.updatedAt = new Date().toISOString();

    // Ensure required fields have defaults
    entry.customFields = entry.customFields || {};
    entry.roleExpectations = entry.roleExpectations || [];

    return entry;
  }

  function handleImport() {
    if (!file) {
      showError('Please select a file');
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          showError('CSV must have headers and at least one data row');
          setIsProcessing(false);
          return;
        }

        // Parse headers
        const headers = parseCSVLine(lines[0]);

        // Parse data rows
        const newEntries = [];
        for (let i = 1; i < lines.length; i++) {
          const csvRow = parseCSVLine(lines[i]);
          if (csvRow.length > 1) { // Skip empty lines
            const entry = mapCSVToEntry(csvRow, headers);
            newEntries.push(entry);
          }
        }

        if (newEntries.length === 0) {
          showError('No valid entries found in CSV');
          setIsProcessing(false);
          return;
        }

        // Get existing entries
        const existingEntries = getEntries();

        // Merge or replace
        let finalEntries;
        if (importMode === 'replace') {
          finalEntries = newEntries;
          showWarning(`Replaced all data with ${newEntries.length} imported entries`);
        } else {
          finalEntries = [...existingEntries, ...newEntries];
          showSuccess(`Imported ${newEntries.length} entries (merged with existing ${existingEntries.length})`);
        }

        // Sort by date (most recent first)
        finalEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Save to storage
        saveEntries(finalEntries);

        setIsProcessing(false);

        // Notify parent and close
        if (onImportComplete) {
          onImportComplete();
        }

        setTimeout(() => {
          onClose();
        }, 500);

      } catch (error) {
        showError('Failed to import CSV. Please check file format.');
        console.error('CSV import error:', error);
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      showError('Failed to read file');
      setIsProcessing(false);
    };

    reader.readAsText(file);
  }

  return (
    <div className="import-csv-overlay" onClick={onClose}>
      <div className="import-csv-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Import Time Entries from CSV</h3>

        <div className="import-form">
          {/* File Upload */}
          <div className="form-group">
            <label className="kds-Label">Select CSV File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="kds-Input"
            />
            {file && (
              <p className="file-info">
                Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Import Mode */}
          <div className="form-group">
            <label className="kds-Label">Import Mode</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="merge"
                  checked={importMode === 'merge'}
                  onChange={(e) => setImportMode(e.target.value)}
                />
                <span>Merge (add to existing entries)</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={(e) => setImportMode(e.target.value)}
                />
                <span>Replace (delete existing entries)</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="preview-section">
              <label className="kds-Label">Preview (first 5 rows)</label>
              <div className="preview-table-container">
                <table className="preview-table">
                  <thead>
                    <tr>
                      {preview[0].map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(1).map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="preview-note">
                Found {preview.length - 1} rows in preview
              </p>
            </div>
          )}

          {/* Expected Format Info */}
          <div className="format-info">
            <p className="kds-Label">Expected CSV Format:</p>
            <p className="format-note">
              Your CSV should have headers: Date, Task Type, Time (hours), Category, Task Code,
              Portfolio, Impact, Role Expectations, Notes, and any custom fields.
            </p>
            <p className="format-note">
              <strong>Tip:</strong> Export your current data to see the expected format!
            </p>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <kds-button kind="secondary" onClick={onClose} disabled={isProcessing}>
              Cancel
            </kds-button>
            <kds-button
              kind="primary"
              onClick={handleImport}
              disabled={!file || isProcessing}
            >
              {isProcessing ? 'Importing...' : 'Import CSV'}
            </kds-button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportCSV;
