import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { KDS_COLORS, CHART_DEFAULTS, sumByImpactLevel } from '../../utils/chartHelpers';
import './Charts.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ImpactDistributionChart({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="chart-container">
        <h3>Impact Distribution</h3>
        <p className="empty-state">No data for selected date range</p>
      </div>
    );
  }

  const impactHours = sumByImpactLevel(entries);
  const totalHours = Object.values(impactHours).reduce((a, b) => a + b, 0);

  // Order: High, Medium, Low, then any others
  const impactOrder = ['High', 'Medium', 'Low'];
  const orderedImpacts = impactOrder.filter(impact => impactHours[impact]);
  const otherImpacts = Object.keys(impactHours).filter(
    impact => !impactOrder.includes(impact)
  );

  const labels = [...orderedImpacts, ...otherImpacts];
  const data = labels.map(label => impactHours[label]);

  // Use specific colors for standard impacts
  const impactColors = {
    'High': '#d32f2f',      // red
    'Medium': '#ff9800',    // orange
    'Low': '#2e7d32'        // green
  };

  const backgroundColor = labels.map(
    label => impactColors[label] || KDS_COLORS.chart[labels.indexOf(label) % KDS_COLORS.chart.length]
  );

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const options = {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      legend: {
        position: 'bottom',
        labels: {
          ...CHART_DEFAULTS.plugins.legend.labels,
          padding: 15
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const pct = ((value / totalHours) * 100).toFixed(1);
            return `${label}: ${value.toFixed(1)}h (${pct}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Impact Distribution</h3>
      <div className="chart-wrapper" style={{ height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
      <div className="chart-breakdown">
        {labels.map((label, index) => (
          <div key={label} className="impact-row">
            <span className="impact-label">{label}:</span>
            <span className="impact-value">{data[index].toFixed(1)}h ({((data[index] / totalHours) * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactDistributionChart;
