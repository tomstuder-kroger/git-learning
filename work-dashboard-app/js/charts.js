/**
 * Charts Module
 * Handles Chart.js visualizations
 */

class DashboardCharts {
    constructor() {
        this.categoryChart = null;
        this.portfolioChart = null;
        this.colors = {
            category: {
                'Doer': '#3B82F6',
                'Collaborator': '#10B981',
                'Facilitator': '#F59E0B',
                'Enabler': '#8B5CF6'
            },
            portfolio: {
                'Assortment': '#3B82F6',
                'Item': '#10B981',
                'S/I/A': '#F59E0B',
                'Supplier': '#8B5CF6',
                'MX/SC': '#EC4899',
                'KTD': '#14B8A6',
                'Other': '#6B7280'
            },
            impact: {
                'High': '#DC2626',
                'Medium': '#F59E0B',
                'Low': '#10B981'
            }
        };
    }

    /**
     * Create Category Pie Chart
     */
    createCategoryPieChart(data) {
        const ctx = document.getElementById('categoryPieChart');
        if (!ctx) return;

        const categoryData = dataParser.aggregateByCategory(data);

        // Convert minutes to hours for display
        const labels = Object.keys(categoryData);
        const values = Object.values(categoryData).map(minutes => (minutes / 60).toFixed(1));
        const colors = labels.map(label => this.colors.category[label]);

        // Destroy existing chart if it exists
        if (this.categoryChart) {
            this.categoryChart.destroy();
        }

        this.categoryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hours',
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${label}: ${value} hrs (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create Portfolio Bar Chart (Grouped by Week)
     */
    createPortfolioBarChart(data) {
        const ctx = document.getElementById('portfolioBarChart');
        if (!ctx) return;

        const portfolioByWeek = dataParser.getPortfolioByWeek();

        // Get all unique portfolios
        const allPortfolios = new Set();
        Object.values(portfolioByWeek).forEach(week => {
            Object.keys(week).forEach(portfolio => allPortfolios.add(portfolio));
        });

        const portfolios = Array.from(allPortfolios).sort();
        const weeks = Object.keys(portfolioByWeek).sort((a, b) => {
            // Sort by date
            const dateA = new Date(a.replace('Week of ', ''));
            const dateB = new Date(b.replace('Week of ', ''));
            return dateA - dateB;
        });

        // Create datasets for each portfolio
        const datasets = portfolios.map(portfolio => {
            const data = weeks.map(week => {
                const minutes = portfolioByWeek[week][portfolio] || 0;
                return (minutes / 60).toFixed(1);
            });

            return {
                label: portfolio,
                data: data,
                backgroundColor: this.colors.portfolio[portfolio] || '#6B7280',
                borderWidth: 0
            };
        });

        // Destroy existing chart if it exists
        if (this.portfolioChart) {
            this.portfolioChart.destroy();
        }

        this.portfolioChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeks,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 12,
                            usePointStyle: true,
                            font: {
                                size: 11,
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y || 0;
                                return `${label}: ${value} hrs`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: '#E5E7EB'
                        }
                    }
                }
            }
        });
    }

    /**
     * Create Impact Indicators
     */
    createImpactIndicators(data) {
        const container = document.getElementById('impactIndicators');
        if (!container) return;

        const impactData = dataParser.getImpactByPortfolio(data);

        // Sort portfolios by total tasks
        const sortedPortfolios = Object.entries(impactData)
            .sort(([, a], [, b]) => b.total - a.total);

        container.innerHTML = sortedPortfolios.map(([portfolio, impacts]) => {
            const total = impacts.total;
            if (total === 0) return '';

            const highPct = (impacts.High / total * 100).toFixed(0);
            const mediumPct = (impacts.Medium / total * 100).toFixed(0);
            const lowPct = (impacts.Low / total * 100).toFixed(0);

            return `
                <div class="impact-row">
                    <div class="impact-header">
                        <span class="portfolio-name">${portfolio}</span>
                        <span class="impact-total">${total} tasks</span>
                    </div>
                    <div class="impact-bars">
                        ${impacts.High > 0 ? `<div class="impact-bar high" style="width: ${highPct}%">${impacts.High}</div>` : ''}
                        ${impacts.Medium > 0 ? `<div class="impact-bar medium" style="width: ${mediumPct}%">${impacts.Medium}</div>` : ''}
                        ${impacts.Low > 0 ? `<div class="impact-bar low" style="width: ${lowPct}%">${impacts.Low}</div>` : ''}
                    </div>
                    <div class="impact-legend">
                        <div class="impact-legend-item">
                            <div class="impact-dot high"></div>
                            <span>High: ${impacts.High}</span>
                        </div>
                        <div class="impact-legend-item">
                            <div class="impact-dot medium"></div>
                            <span>Medium: ${impacts.Medium}</span>
                        </div>
                        <div class="impact-legend-item">
                            <div class="impact-dot low"></div>
                            <span>Low: ${impacts.Low}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Update all charts with filtered data
     */
    updateCharts(filteredData) {
        this.createCategoryPieChart(filteredData);
        this.createPortfolioBarChart(filteredData);
        this.createImpactIndicators(filteredData);
    }

    /**
     * Destroy all charts
     */
    destroy() {
        if (this.categoryChart) {
            this.categoryChart.destroy();
            this.categoryChart = null;
        }
        if (this.portfolioChart) {
            this.portfolioChart.destroy();
            this.portfolioChart = null;
        }
    }
}

// Create global instance
const dashboardCharts = new DashboardCharts();
