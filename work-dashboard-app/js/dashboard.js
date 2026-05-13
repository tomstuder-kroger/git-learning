/**
 * Dashboard Controller
 * Main logic for the dashboard view
 */

class Dashboard {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            // Show loading state
            this.showLoading();

            // Load CSV data
            await dataParser.loadCSV();

            // Hide loading state
            this.hideLoading();

            // Populate week filter
            this.populateWeekFilter();

            // Display initial data
            this.updateDashboard();

            // Set up event listeners
            this.setupEventListeners();

        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError();
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('hidden');
        }

        // Hide charts initially
        const chartsGrid = document.querySelector('.charts-grid');
        const filterSection = document.querySelector('.filter-section');
        if (chartsGrid) chartsGrid.style.display = 'none';
        if (filterSection) filterSection.style.display = 'none';
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }

        // Show charts
        const chartsGrid = document.querySelector('.charts-grid');
        const filterSection = document.querySelector('.filter-section');
        if (chartsGrid) chartsGrid.style.display = 'grid';
        if (filterSection) filterSection.style.display = 'flex';
    }

    showError() {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');

        if (loading) loading.classList.add('hidden');
        if (error) error.classList.remove('hidden');
    }

    populateWeekFilter() {
        const weekFilter = document.getElementById('week-filter');
        if (!weekFilter) return;

        const weeks = dataParser.getUniqueWeeks();

        // Clear existing options except "All Time"
        weekFilter.innerHTML = '<option value="all">All Time</option>';

        // Add week options (most recent first)
        weeks.reverse().forEach(week => {
            const option = document.createElement('option');
            option.value = week.toISOString();
            option.textContent = dataParser.formatWeek(week);
            weekFilter.appendChild(option);
        });
    }

    setupEventListeners() {
        const weekFilter = document.getElementById('week-filter');
        if (weekFilter) {
            weekFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.updateDashboard();
            });
        }
    }

    updateDashboard() {
        // Get filtered data
        const filteredData = this.currentFilter === 'all'
            ? dataParser.parsedData
            : dataParser.filterByWeek(this.currentFilter);

        // Update summary stats
        this.updateSummaryStats(filteredData);

        // Update all charts
        dashboardCharts.updateCharts(filteredData);
    }

    updateSummaryStats(data) {
        const stats = dataParser.getSummaryStats(data);

        const totalTasksEl = document.getElementById('total-tasks');
        const totalHoursEl = document.getElementById('total-hours');

        if (totalTasksEl) {
            totalTasksEl.textContent = stats.totalTasks;
        }

        if (totalHoursEl) {
            totalHoursEl.textContent = stats.totalHours;
        }
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
});
