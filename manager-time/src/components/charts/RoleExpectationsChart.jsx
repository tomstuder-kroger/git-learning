import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { KDS_COLORS, CHART_DEFAULTS, sumByRoleExpectation } from '../../utils/chartHelpers';
import './Charts.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function RoleExpectationsChart({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="chart-container">
        <h3>Time by Role Expectation</h3>
        <p className="empty-state">No data for selected date range</p>
      </div>
    );
  }

  const expectationHours = sumByRoleExpectation(entries);

  if (Object.keys(expectationHours).length === 0) {
    return (
      <div className="chart-container">
        <h3>Time by Role Expectation</h3>
        <p className="empty-state">No role expectations assigned</p>
      </div>
    );
  }

  const totalHours = Object.values(expectationHours).reduce((a, b) => a + b, 0);

  // Sort by hours descending for better visual prominence
  const labels = Object.keys(expectationHours).sort(
    (a, b) => expectationHours[b] - expectationHours[a]
  );
  const data = labels.map(label => expectationHours[label]);

  const backgroundColor = labels.map(
    (_, index) => KDS_COLORS.chart[index % KDS_COLORS.chart.length]
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
      <h3>Time by Role Expectation</h3>
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

export default RoleExpectationsChart;
