// CSV Import utilities

/**
 * Parse CSV text into array of objects
 * @param {string} csvText - CSV file contents
 * @returns {Array} Array of parsed row objects
 */
export function parseCSV(csvText) {
  const lines = parseCSVLines(csvText);
  if (lines.length === 0) {
    throw new Error('CSV file is empty');
  }

  // Parse header row
  const headers = parseCSVRow(lines[0]);

  // Parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);
    if (values.length === 0 || values.every(v => !v)) {
      continue; // Skip empty rows
    }

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
}

/**
 * Split CSV text into lines, respecting quoted fields with newlines
 * @param {string} csvText - CSV file contents
 * @returns {Array} Array of CSV line strings
 */
function parseCSVLines(csvText) {
  const lines = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote - add both quotes and skip next char
        currentLine += '""';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
        currentLine += char;
      }
    } else if (char === '\n' && !inQuotes) {
      // End of line (only when not inside quotes)
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else if (char === '\r' && nextChar === '\n' && !inQuotes) {
      // Windows line ending (CRLF) - skip \r, will handle \n on next iteration
      continue;
    } else if (char === '\r' && !inQuotes) {
      // Mac line ending (CR only) - treat as line break
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      // Regular character
      currentLine += char;
    }
  }

  // Add last line if not empty
  if (currentLine.trim()) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Parse a single CSV row, handling quoted values
 * @param {string} row - CSV row text
 * @returns {Array} Array of cell values
 */
function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current.trim());

  return result;
}

/**
 * Map CSV row to time entry format
 * @param {Object} row - Parsed CSV row
 * @returns {Object} Time entry object
 */
export function mapCSVRowToEntry(row) {
  // Normalize column names (case-insensitive lookup)
  const normalizedRow = {};
  Object.keys(row).forEach(key => {
    const normalizedKey = key.trim();
    normalizedRow[normalizedKey.toLowerCase()] = row[key];
    normalizedRow[normalizedKey] = row[key]; // Keep original too
  });

  // Extract date (handle multiple formats)
  const dateValue = normalizedRow['date'] || '';
  const parsedDate = parseFlexibleDate(dateValue);

  // Extract time (handle "15 min", "2 hr", or numeric)
  const timeValue = normalizedRow['time'] || normalizedRow['time (hours)'] || '';
  const parsedTime = parseFlexibleTime(timeValue);

  // Extract task type (from "Task Type" or "Tasks" column)
  const taskTypeValue = normalizedRow['task type'] || normalizedRow['tasks'] || '';
  const mappedTaskType = mapTaskTypeLabel(taskTypeValue);

  // Extract role expectations (semicolon-separated)
  const roleExpValue = normalizedRow['role expectations'] || '';
  const roleExpectations = roleExpValue
    ? roleExpValue.split(';').map(r => r.trim()).filter(Boolean)
    : [];

  // Extract task code (clean up encoding issues)
  const taskCodeValue = normalizedRow['task code'] || '';
  const cleanedTaskCode = cleanEncodingIssues(taskCodeValue);

  // Extract custom fields (participant, domain, etc.)
  const customFields = {};
  const knownFields = ['date', 'task type', 'tasks', 'time', 'time (hours)', 'category',
                       'task code', 'portfolio', 'impact', 'role expectations', 'notes'];

  Object.keys(row).forEach(key => {
    const keyLower = key.toLowerCase().trim();
    if (!knownFields.includes(keyLower) && row[key]) {
      customFields[key] = row[key];
    }
  });

  // Always store original task description for reference
  if (taskTypeValue) {
    customFields['Original Task'] = taskTypeValue;
  }

  // Use mapped task type or default, but if it's empty and time is 0, skip it
  const finalTaskType = mappedTaskType || 'admin-planning';
  const finalCategory = normalizedRow['category'] || '';

  return {
    date: parsedDate,
    taskType: finalTaskType,
    time: parsedTime,
    category: finalCategory,
    taskCode: cleanedTaskCode,
    portfolio: normalizedRow['portfolio'] || '',
    impact: normalizedRow['impact'] || '',
    roleExpectations,
    customFields,
    notes: normalizedRow['notes'] || ''
  };
}

/**
 * Parse flexible date formats
 * @param {string} dateStr - Date string in various formats
 * @returns {string} Date in YYYY-MM-DD format
 */
function parseFlexibleDate(dateStr) {
  if (!dateStr) return '';

  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  // Try to parse "Month DD, YYYY" format (e.g., "November 20, 2025")
  const monthNames = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };

  const monthDayYear = dateStr.match(/^([a-z]+)\s+(\d{1,2}),?\s+(\d{4})$/i);
  if (monthDayYear) {
    const [, monthName, day, year] = monthDayYear;
    const monthNum = monthNames[monthName.toLowerCase()];
    if (monthNum !== undefined) {
      const month = String(monthNum + 1).padStart(2, '0');
      const dayPadded = String(day).padStart(2, '0');
      return `${year}-${month}-${dayPadded}`;
    }
  }

  // Try to parse MM/DD/YYYY or M/D/YYYY
  const slashDate = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashDate) {
    const [, month, day, year] = slashDate;
    const monthPadded = String(month).padStart(2, '0');
    const dayPadded = String(day).padStart(2, '0');
    return `${year}-${monthPadded}-${dayPadded}`;
  }

  // Try to parse with Date object as fallback
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      const year = parsed.getFullYear();
      const month = String(parsed.getMonth() + 1).padStart(2, '0');
      const day = String(parsed.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  } catch (e) {
    // Ignore parse errors
  }

  return dateStr; // Return as-is if can't parse
}

/**
 * Parse flexible time formats
 * @param {string} timeStr - Time string (e.g., "2 hr", "30 min", "1.5")
 * @returns {number} Time in decimal hours
 */
function parseFlexibleTime(timeStr) {
  if (!timeStr) return 0;

  const str = String(timeStr).toLowerCase().trim();

  // Already a number
  const numericMatch = str.match(/^(\d+\.?\d*)$/);
  if (numericMatch) {
    const value = parseFloat(numericMatch[1]);
    // If value > 24, assume it's minutes (e.g., "30" = 30 min = 0.5 hr)
    // Otherwise treat as hours (e.g., "2" = 2 hr)
    return value > 24 ? value / 60 : value;
  }

  // Parse "X hr" or "X hour" or "X hours"
  const hourMatch = str.match(/^(\d+\.?\d*)\s*h(ou)?r(s)?$/);
  if (hourMatch) {
    return parseFloat(hourMatch[1]);
  }

  // Parse "X min" or "X minute" or "X minutes"
  const minMatch = str.match(/^(\d+\.?\d*)\s*min(ute)?(s)?$/);
  if (minMatch) {
    return parseFloat(minMatch[1]) / 60;
  }

  // Parse combined "X hr Y min"
  const combinedMatch = str.match(/^(\d+\.?\d*)\s*h(ou)?r(s)?\s+(\d+\.?\d*)\s*min(ute)?(s)?$/);
  if (combinedMatch) {
    const hours = parseFloat(combinedMatch[1]);
    const minutes = parseFloat(combinedMatch[4]);
    return hours + (minutes / 60);
  }

  // Fallback: try to parse as number
  const parsed = parseFloat(str);
  if (isNaN(parsed)) return 0;
  // Apply same logic: if > 24, assume minutes
  return parsed > 24 ? parsed / 60 : parsed;
}

/**
 * Clean up encoding issues in text (replace common problematic characters)
 * @param {string} text - Text with potential encoding issues
 * @returns {string} Cleaned text
 */
function cleanEncodingIssues(text) {
  if (!text) return '';

  return text
    .replace(/�/g, '-')  // Replace � with dash
    .replace(/â€"/g, '-') // Replace em-dash encoding issue
    .replace(/â€™/g, "'") // Replace apostrophe encoding issue
    .trim();
}

/**
 * Map task type label back to ID
 * @param {string} label - Task type label from CSV
 * @returns {string} Task type ID or null if no match
 */
function mapTaskTypeLabel(label) {
  if (!label) return null;

  const labelLower = label.toLowerCase().trim();

  // Exact matches
  const exactMapping = {
    '1:1 meeting': '1on1-meeting',
    'standup': 'standup',
    'focus time': 'focus-time',
    'learning & development': 'learning-dev',
    'admin - emails': 'admin-emails',
    'admin - planning': 'admin-planning',
    'admin - time entry': 'admin-time-entry',
    'manager responsibilities': 'manager-responsibilities',
    'ktd town hall': 'ktd-town-hall',
    'side of desk work': 'side-of-desk',
    'it support': 'it-support'
  };

  if (exactMapping[labelLower]) {
    return exactMapping[labelLower];
  }

  // Fuzzy matching based on keywords
  if (labelLower.includes('1:1') || labelLower.includes('one-on-one')) {
    return '1on1-meeting';
  }
  if (labelLower.includes('standup') || labelLower.includes('stand-up')) {
    return 'standup';
  }
  if (labelLower.includes('focus')) {
    return 'focus-time';
  }
  if (labelLower.includes('learning') || labelLower.includes('training') || labelLower.includes('development')) {
    return 'learning-dev';
  }
  if (labelLower.includes('email')) {
    return 'admin-emails';
  }
  if (labelLower.includes('planning') || labelLower.includes('admin')) {
    return 'admin-planning';
  }
  if (labelLower.includes('town hall') || labelLower.includes('ktd')) {
    return 'ktd-town-hall';
  }

  // No match found - return null to use fallback
  return null;
}

/**
 * Validate imported entry
 * @param {Object} entry - Entry to validate
 * @returns {Object} Validation result {isValid, errors, shouldSkip}
 */
export function validateEntry(entry) {
  const errors = [];
  let shouldSkip = false;

  // Check if this is a "Note:" or "PTO" entry - these are informational and should be skipped
  const taskValue = entry.customFields?.['Original Task'] || '';
  const taskLower = taskValue.toLowerCase().trim();
  if (taskLower.startsWith('note:') || taskLower === 'pto' || taskLower.startsWith('pto')) {
    shouldSkip = true;
    return { isValid: false, errors: [`Informational entry skipped: "${taskValue}"`], shouldSkip: true };
  }

  // If date, time, and category are ALL empty, skip this row
  if (!entry.date && (entry.time === 0 || !entry.time) && !entry.category) {
    shouldSkip = true;
    return { isValid: false, errors: ['Empty row - skipped'], shouldSkip: true };
  }

  // Validate date
  if (!entry.date) {
    errors.push('Missing date');
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    errors.push(`Invalid date format: "${entry.date}"`);
  }

  // Validate task type (required) - but we always provide a default, so this should rarely fail
  if (!entry.taskType) {
    errors.push('Missing task type');
  }

  // Validate time - must be a valid number (can be 0)
  if (entry.time === undefined || entry.time === null || isNaN(entry.time)) {
    errors.push('Invalid or missing time value');
  } else if (entry.time < 0 || entry.time > 24) {
    errors.push(`Time must be between 0 and 24 hours (got ${entry.time})`);
  }

  // Category is optional - no validation needed

  return {
    isValid: errors.length === 0,
    errors,
    shouldSkip
  };
}

/**
 * Import CSV file and return processed entries
 * @param {File} file - CSV file to import
 * @returns {Promise<Object>} Import results {entries, errors}
 */
export async function importCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csvText = event.target.result;
        const rows = parseCSV(csvText);

        const results = {
          entries: [],
          errors: [],
          skipped: 0,
          skippedInfo: 0  // Track informational skips separately
        };

        rows.forEach((row, index) => {
          try {
            const entry = mapCSVRowToEntry(row);
            const validation = validateEntry(entry);

            if (validation.isValid) {
              // Add metadata
              entry.id = `import-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              entry.createdAt = new Date().toISOString();
              entry.updatedAt = new Date().toISOString();
              results.entries.push(entry);
            } else if (validation.shouldSkip) {
              // This is an informational row (Note, PTO, etc.) - skip silently
              results.skippedInfo++;
            } else {
              // This is an error - log it
              results.errors.push({
                row: index + 2, // +2 for header and 0-index
                data: row,
                errors: validation.errors
              });
              results.skipped++;
            }
          } catch (error) {
            results.errors.push({
              row: index + 2,
              data: row,
              errors: [error.message]
            });
            results.skipped++;
          }
        });

        resolve(results);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
