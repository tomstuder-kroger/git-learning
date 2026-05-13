/**
 * Data Table Controller
 * Handles table display, sorting, and filtering
 */

class DataTable {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.columnFilters = {};
        this.globalSearch = '';
        this.debounceTimer = null;
        this.currentPage = 1;
        this.rowsPerPage = 20;
        this.init();
    }

    async init() {
        try {
            // Show loading state
            this.showLoading();

            // Load CSV data
            await dataParser.loadCSV();

            this.data = dataParser.parsedData;
            this.filteredData = [...this.data];

            // Hide loading state
            this.hideLoading();

            // Render table
            this.renderTable();

            // Set up event listeners
            this.setupEventListeners();

            // Render pagination
            this.renderPagination();

            // Update row count
            this.updateRowCount();

        } catch (error) {
            console.error('Error initializing table:', error);
            this.showError();
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('hidden');
        }

        const tableWrapper = document.querySelector('.table-wrapper');
        const tableControls = document.querySelector('.table-controls');
        if (tableWrapper) tableWrapper.style.display = 'none';
        if (tableControls) tableControls.style.display = 'none';
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }

        const tableWrapper = document.querySelector('.table-wrapper');
        const tableControls = document.querySelector('.table-controls');
        if (tableWrapper) tableWrapper.style.display = 'block';
        if (tableControls) tableControls.style.display = 'flex';
    }

    showError() {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');

        if (loading) loading.classList.add('hidden');
        if (error) error.classList.remove('hidden');
    }

    setupEventListeners() {
        // Global search
        const globalSearch = document.getElementById('global-search');
        if (globalSearch) {
            globalSearch.addEventListener('input', (e) => {
                this.globalSearch = e.target.value.toLowerCase();
                this.debounceFilter();
            });
        }

        // Clear filters button
        const clearFilters = document.getElementById('clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Column header sorting
        const sortableHeaders = document.querySelectorAll('.sortable');
        sortableHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                // Don't trigger sort when clicking on filter input
                if (e.target.classList.contains('column-filter')) return;

                const column = header.dataset.column;
                this.sortByColumn(column);
            });
        });

        // Column filters
        const columnFilters = document.querySelectorAll('.column-filter');
        columnFilters.forEach(filter => {
            filter.addEventListener('input', (e) => {
                const column = e.target.closest('th').dataset.column;
                this.columnFilters[column] = e.target.value.toLowerCase();
                this.debounceFilter();
            });

            // Prevent click event from bubbling to header
            filter.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Notes expand/collapse (delegated)
        const tbody = document.getElementById('table-body');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const btn = e.target.closest('.notes-toggle');
                if (!btn) return;
                const cell = btn.closest('.notes-cell');
                const preview = cell.querySelector('.notes-preview');
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    preview.textContent = decodeURIComponent(btn.dataset.preview);
                    btn.textContent = '…';
                    btn.setAttribute('aria-expanded', 'false');
                    cell.classList.remove('expanded');
                } else {
                    preview.textContent = decodeURIComponent(btn.dataset.full);
                    btn.textContent = ' ↑';
                    btn.setAttribute('aria-expanded', 'true');
                    cell.classList.add('expanded');
                }
            });
        }

        // Rows per page
        document.addEventListener('change', (e) => {
            if (e.target.id === 'rows-per-page') {
                this.rowsPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.renderTable();
                this.renderPagination();
            }
        });

        // Pagination buttons (delegated)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.page-btn');
            if (!btn) return;
            const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
            if (btn.id === 'first-page') this.goToPage(1);
            else if (btn.id === 'prev-page') this.goToPage(this.currentPage - 1);
            else if (btn.id === 'next-page') this.goToPage(this.currentPage + 1);
            else if (btn.id === 'last-page') this.goToPage(totalPages);
            else if (btn.dataset.page) this.goToPage(parseInt(btn.dataset.page));
        });
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        this.currentPage = Math.max(1, Math.min(page, totalPages));
        this.renderTable();
        this.renderPagination();
    }

    debounceFilter() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.applyFilters();
        }, 300);
    }

    applyFilters() {
        this.filteredData = this.data.filter(row => {
            // Global search
            if (this.globalSearch) {
                const searchText = this.globalSearch;
                const rowText = Object.values(row).join(' ').toLowerCase();
                if (!rowText.includes(searchText)) {
                    return false;
                }
            }

            // Column filters
            for (const [column, filterValue] of Object.entries(this.columnFilters)) {
                if (filterValue) {
                    const cellValue = String(row[column] || '').toLowerCase();
                    if (!cellValue.includes(filterValue)) {
                        return false;
                    }
                }
            }

            return true;
        });

        // Re-apply current sort
        if (this.sortColumn) {
            this.applySorting();
        }

        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
        this.updateRowCount();
    }

    sortByColumn(column) {
        // Toggle sort direction if clicking same column
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        this.applySorting();
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
        this.updateSortIndicators();
    }

    applySorting() {
        this.filteredData.sort((a, b) => {
            let aVal = a[this.sortColumn];
            let bVal = b[this.sortColumn];

            // Handle special cases
            if (this.sortColumn === 'timeInMinutes') {
                aVal = a.timeInMinutes || 0;
                bVal = b.timeInMinutes || 0;
            } else if (this.sortColumn === 'date') {
                aVal = a.dateObj || new Date(0);
                bVal = b.dateObj || new Date(0);
            } else {
                aVal = String(aVal || '').toLowerCase();
                bVal = String(bVal || '').toLowerCase();
            }

            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    updateSortIndicators() {
        // Reset all indicators
        document.querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.classList.remove('asc', 'desc');
        });

        // Set active indicator
        if (this.sortColumn) {
            const header = document.querySelector(`th[data-column="${this.sortColumn}"]`);
            if (header) {
                const indicator = header.querySelector('.sort-indicator');
                if (indicator) {
                    indicator.classList.add(this.sortDirection);
                }
            }
        }
    }

    clearAllFilters() {
        // Clear global search
        const globalSearch = document.getElementById('global-search');
        if (globalSearch) {
            globalSearch.value = '';
        }
        this.globalSearch = '';

        // Clear column filters
        document.querySelectorAll('.column-filter').forEach(filter => {
            filter.value = '';
        });
        this.columnFilters = {};

        // Reset sort
        this.sortColumn = null;
        this.sortDirection = 'asc';

        // Re-render
        this.filteredData = [...this.data];
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
        this.updateRowCount();
        this.updateSortIndicators();
    }

    renderTable() {
        const tbody = document.getElementById('table-body');
        if (!tbody) return;

        if (this.filteredData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                        No data found. Try adjusting your filters.
                    </td>
                </tr>
            `;
            return;
        }

        const start = (this.currentPage - 1) * this.rowsPerPage;
        const pageData = this.filteredData.slice(start, start + this.rowsPerPage);

        tbody.innerHTML = pageData.map(row => {
            const categoryClass = row.category.toLowerCase().replace(/\s+/g, '-');

            return `
                <tr>
                    <td>${this.escapeHtml(row.date)}</td>
                    <td>${this.escapeHtml(row.tasks)}</td>
                    <td>
                        ${row.category ? `<span class="category-badge ${categoryClass}">${this.escapeHtml(row.category)}</span>` : ''}
                    </td>
                    <td>${this.escapeHtml(row.time)}</td>
                    <td>${this.escapeHtml(row.taskCode)}</td>
                    <td>${this.escapeHtml(row.portfolio)}</td>
                    <td data-impact="${this.escapeHtml(row.impact)}">${this.escapeHtml(row.impact)}</td>
                    <td>${this.escapeHtml(row.roleExpectations)}</td>
                    <td class="notes-cell">${this.renderNotes(row.notes)}</td>
                </tr>
            `;
        }).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        const current = this.currentPage;

        // Record count
        const recordCount = document.getElementById('record-count');
        if (recordCount) {
            recordCount.textContent = `${this.filteredData.length} Record(s)`;
        }

        // Rows per page selector value
        const rowsSelect = document.getElementById('rows-per-page');
        if (rowsSelect) rowsSelect.value = this.rowsPerPage;

        // Disable/enable first/prev/next/last
        const firstBtn = document.getElementById('first-page');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const lastBtn = document.getElementById('last-page');
        if (firstBtn) firstBtn.disabled = current === 1;
        if (prevBtn) prevBtn.disabled = current === 1;
        if (nextBtn) nextBtn.disabled = current === totalPages || totalPages === 0;
        if (lastBtn) lastBtn.disabled = current === totalPages || totalPages === 0;

        // Page number buttons
        const pageNumbers = document.getElementById('page-numbers');
        if (!pageNumbers) return;

        // Show a window of up to 5 pages around the current page
        const windowSize = 5;
        let startPage = Math.max(1, current - Math.floor(windowSize / 2));
        let endPage = Math.min(totalPages, startPage + windowSize - 1);
        if (endPage - startPage < windowSize - 1) {
            startPage = Math.max(1, endPage - windowSize + 1);
        }

        let html = '';
        for (let p = startPage; p <= endPage; p++) {
            const isActive = p === current;
            html += `<button class="page-btn page-number${isActive ? ' active' : ''}" data-page="${p}">${p}</button>`;
        }
        pageNumbers.innerHTML = html;
    }

    updateRowCount() {
        const visibleRows = document.getElementById('visible-rows');
        const totalRows = document.getElementById('total-rows');

        if (visibleRows) {
            visibleRows.textContent = this.filteredData.length;
        }

        if (totalRows) {
            totalRows.textContent = this.data.length;
        }
    }

    truncateWords(text, maxWords = 20) {
        if (!text) return { display: '', isTruncated: false };
        const words = text.trim().split(/\s+/);
        if (words.length <= maxWords) return { display: text, isTruncated: false };
        return { display: words.slice(0, maxWords).join(' '), full: text, isTruncated: true };
    }

    renderNotes(text) {
        const { display, full, isTruncated } = this.truncateWords(text);
        if (!isTruncated) return `<div class="notes-flex"><span class="notes-preview">${this.escapeHtml(display)}</span></div>`;
        return `<div class="notes-flex"><span class="notes-preview">${this.escapeHtml(display)}</span><button class="notes-toggle" data-full="${encodeURIComponent(full)}" data-preview="${encodeURIComponent(display)}" aria-expanded="false">…</button></div>`;
    }

    escapeHtml(text) {
        if (text === null || text === undefined) return '';

        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }
}

// Initialize table when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DataTable();
});
