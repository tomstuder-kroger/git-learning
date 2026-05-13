import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { KDS_COLORS, CHART_DEFAULTS, sumByDayOfWeek } from '../../utils/chartHelpers';
import './Charts.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function WorkloadByDayChart({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="chart-container">
        <h3>Workload by Day of Week</h3>
        <p className="empty-state">No data for selected date range</p>
      </div>
    );
  }

  const dayHours = sumByDayOfWeek(entries);
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekdayHours = weekdays.map(day => dayHours[day]);

  // Check if there's any weekend data
  const weekendHours = dayHours['Saturday'] + dayHours['Sunday'];
  const includeWeekend = weekendHours > 0;

  const labels = includeWeekend
    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    : weekdays;
  const data = includeWeekend
    ? [dayHours['Monday'], dayHours['Tuesday'], dayHours['Wednesday'], dayHours['Thursday'], dayHours['Friday'], dayHours['Saturday'], dayHours['Sunday']]
    : weekdayHours;

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Hours',
        data,
        backgroundColor: KDS_COLORS.brand.primary,
        borderColor: KDS_COLORS.brand.secondary,
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const options = {
    ...CHART_DEFAULTS,
    indexAxis: undefined, // Vertical bars
    plugins: {
      ...CHART_DEFAULTS.plugins,
      legend: {
        display: false
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (context) => {
            return `${context.parsed.y.toFixed(1)}h`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}h`
        }
      }
    }
  };

  const maxHours = Math.max(...data);
  const busiest = labels[data.indexOf(maxHours)];

  return (
    <div className="chart-container">
      <h3>Workload by Day of Week</h3>
      <div className="chart-wrapper" style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
      <div className="chart-footer">
        <p>Busiest Day: <strong>{busiest}</strong> ({maxHours.toFixed(1)}h)</p>
      </div>
    </div>
  );
}

export default WorkloadByDayChart;
