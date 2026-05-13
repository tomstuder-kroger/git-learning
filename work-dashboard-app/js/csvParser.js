/**
 * CSV Parser Module
 * Handles loading and parsing work data from CSV file
 */

class WorkDataParser {
    constructor() {
        this.rawData = [];
        this.parsedData = [];
    }

    /**
     * Parse time string to minutes
     * Handles formats: "2 hr", "30 min", "1.5 hr", blank
     */
    parseTime(timeStr) {
        if (!timeStr || timeStr.trim() === '') return 0;

        const hrMatch = timeStr.match(/(\d+\.?\d*)\s*hr/i);
        const minMatch = timeStr.match(/(\d+)\s*min/i);

        let minutes = 0;
        if (hrMatch) {
            minutes += parseFloat(hrMatch[1]) * 60;
        }
        if (minMatch) {
            minutes += parseInt(minMatch[1]);
        }

        return minutes;
    }

    /**
     * Parse date string to Date object
     */
    parseDate(dateStr) {
        if (!dateStr || dateStr.trim() === '') return null;

        // Try to parse the date
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    }

    /**
     * Get the start of the week for a given date (Monday)
     */
    getWeekStart(date) {
        if (!date) return null;

        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday

        const weekStart = new Date(d.setDate(diff));
        weekStart.setHours(0, 0, 0, 0);
        return weekStart;
    }

    /**
     * Format date as readable string
     */
    formatDate(date) {
        if (!date) return '';

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    /**
     * Format week start date for display
     */
    formatWeek(date) {
        if (!date) return '';

        const weekStart = this.getWeekStart(date);
        return `Week of ${this.formatDate(weekStart)}`;
    }

    /**
     * Check if row is a separator or empty row
     */
    isValidDataRow(row) {
        // Check if date field exists and is not empty
        if (!row.Date || row.Date.trim() === '') return false;

        // Check if it's a week separator (e.g., "Week of 11/24")
        if (row.Date.toLowerCase().includes('week of')) return false;

        // Check if it's a header row
        if (row.Date.toLowerCase() === 'date') return false;

        // Check if Tasks field is empty or just a separator
        if (!row.Tasks || row.Tasks.trim() === '') return false;

        return true;
    }

    /**
     * Clean and normalize portfolio name
     */
    normalizePortfolio(portfolio) {
        if (!portfolio) return 'Other';

        const cleaned = portfolio.trim();

        // Map common variations
        const mapping = {
            'S/I/A': 'S/I/A',
            'SIA': 'S/I/A',
            'MX/SC': 'MX/SC',
            'MXSC': 'MX/SC',
            'MSCX': 'MX/SC'
        };

        return mapping[cleaned] || cleaned || 'Other';
    }

    /**
     * Parse CSV data
     */
    async loadCSV(filePath = 'ts_work_data.csv') {
        return new Promise((resolve, reject) => {
            Papa.parse(filePath, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    this.rawData = results.data;
                    this.parsedData = this.processData(results.data);
                    resolve(this.parsedData);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    /**
     * Process raw CSV data into structured format
     */
    processData(rawData) {
        const processed = rawData
            .filter(row => this.isValidDataRow(row))
            .map((row, index) => {
                const date = this.parseDate(row.Date);
                const timeInMinutes = this.parseTime(row.Time);

                return {
                    id: index,
                    date: row.Date,
                    dateObj: date,
                    weekStart: this.getWeekStart(date),
                    tasks: row.Tasks || '',
                    category: row.Category || '',
                    time: row.Time || '',
                    timeInMinutes: timeInMinutes,
                    timeInHours: (timeInMinutes / 60).toFixed(2),
                    taskCode: row['Task Code'] || '',
                    portfolio: this.normalizePortfolio(row.Portfolio),
                    impact: row.Impact || '',
                    roleExpectations: row['Role Expectations'] || '',
                    notes: row.Notes || '',
                    srDirectorComments: row[' Sr. Director Comments'] || row['Sr. Director Comments'] || ''
                };
            });

        return processed;
    }

    /**
     * Get unique weeks from data
     */
    getUniqueWeeks() {
        const weeks = new Map();

        this.parsedData.forEach(row => {
            if (row.weekStart) {
                const weekKey = row.weekStart.getTime();
                if (!weeks.has(weekKey)) {
                    weeks.set(weekKey, row.weekStart);
                }
            }
        });

        // Sort weeks chronologically
        return Array.from(weeks.values()).sort((a, b) => a - b);
    }

    /**
     * Filter data by week
     */
    filterByWeek(weekStart) {
        if (!weekStart || weekStart === 'all') {
            return this.parsedData;
        }

        const weekStartTime = typeof weekStart === 'string'
            ? new Date(weekStart).getTime()
            : weekStart.getTime();

        return this.parsedData.filter(row => {
            if (!row.weekStart) return false;
            return row.weekStart.getTime() === weekStartTime;
        });
    }

    /**
     * Get data aggregated by category
     */
    aggregateByCategory(data = this.parsedData) {
        const categories = {
            'Doer': 0,
            'Collaborator': 0,
            'Facilitator': 0,
            'Enabler': 0
        };

        data.forEach(row => {
            if (categories.hasOwnProperty(row.category)) {
                categories[row.category] += row.timeInMinutes;
            }
        });

        return categories;
    }

    /**
     * Get data aggregated by portfolio
     */
    aggregateByPortfolio(data = this.parsedData) {
        const portfolios = {};

        data.forEach(row => {
            const portfolio = row.portfolio || 'Other';
            if (!portfolios[portfolio]) {
                portfolios[portfolio] = 0;
            }
            portfolios[portfolio] += row.timeInMinutes;
        });

        return portfolios;
    }

    /**
     * Get portfolio data grouped by week
     */
    getPortfolioByWeek() {
        const weekData = {};

        this.parsedData.forEach(row => {
            if (!row.weekStart) return;

            const weekKey = this.formatWeek(row.weekStart);
            if (!weekData[weekKey]) {
                weekData[weekKey] = {};
            }

            const portfolio = row.portfolio || 'Other';
            if (!weekData[weekKey][portfolio]) {
                weekData[weekKey][portfolio] = 0;
            }

            weekData[weekKey][portfolio] += row.timeInMinutes;
        });

        return weekData;
    }

    /**
     * Get impact distribution by portfolio
     */
    getImpactByPortfolio(data = this.parsedData) {
        const portfolioImpact = {};

        data.forEach(row => {
            const portfolio = row.portfolio || 'Other';
            if (!portfolioImpact[portfolio]) {
                portfolioImpact[portfolio] = {
                    High: 0,
                    Medium: 0,
                    Low: 0,
                    total: 0
                };
            }

            const impact = row.impact;
            if (impact === 'High' || impact === 'Medium' || impact === 'Low') {
                portfolioImpact[portfolio][impact]++;
                portfolioImpact[portfolio].total++;
            }
        });

        return portfolioImpact;
    }

    /**
     * Get summary statistics
     */
    getSummaryStats(data = this.parsedData) {
        const totalTasks = data.length;
        const totalMinutes = data.reduce((sum, row) => sum + row.timeInMinutes, 0);
        const totalHours = (totalMinutes / 60).toFixed(1);

        return {
            totalTasks,
            totalHours,
            totalMinutes
        };
    }
}

// Create global instance
const dataParser = new WorkDataParser();
