import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { KDS_COLORS, CHART_DEFAULTS, sumByTaskType, getTaskTypeLabel } from '../../utils/chartHelpers';
import './Charts.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskTypeChart({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="chart-container">
        <h3>Time by Task Type</h3>
        <p className="empty-state">No data for selected date range</p>
      </div>
    );
  }

  const taskTypeHours = sumByTaskType(entries);
  const totalHours = Object.values(taskTypeHours).reduce((a, b) => a + b, 0);

  // Get top 10 task types, group rest as "Other"
  const sortedTypes = Object.entries(taskTypeHours)
    .sort(([, a], [, b]) => b - a);

  let labels = [];
  let data = [];
  let otherHours = 0;

  sortedTypes.forEach(([taskType, hours], index) => {
    if (index < 10) {
      labels.push(getTaskTypeLabel(taskType));
      data.push(hours);
    } else {
      otherHours += hours;
    }
  });

  if (otherHours > 0) {
    labels.push('Other');
    data.push(otherHours);
  }

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: KDS_COLORS.chart.slice(0, labels.length),
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
        position: 'right',
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
      <h3>Time by Task Type</h3>
      <div className="chart-wrapper" style={{ height: '300px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="chart-footer">
        <p>Total Hours: <strong>{totalHours.toFixed(1)}h</strong></p>
      </div>
    </div>
  );
}

export default TaskTypeChart;
