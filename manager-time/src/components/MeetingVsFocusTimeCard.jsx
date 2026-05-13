import { getMeetingVsFocusTimeSplit } from '../utils/chartHelpers';
import './MeetingVsFocusTimeCard.css';

function MeetingVsFocusTimeCard({ entries }) {
  const { meetings, focusTime, admin } = getMeetingVsFocusTimeSplit(entries);
  const totalHours = meetings + focusTime + admin;

  if (totalHours === 0) {
    return (
      <div className="stat-card meeting-card">
        <h3>Meeting vs Focus Time</h3>
        <p className="empty-state">No data for selected date range</p>
      </div>
    );
  }

  const meetingPct = (meetings / totalHours) * 100;
  const focusPct = (focusTime / totalHours) * 100;
  const adminPct = (admin / totalHours) * 100;

  return (
    <div className="stat-card meeting-card">
      <h3>Meeting vs Focus Time</h3>
      <div className="meeting-breakdown">
        <div className="meeting-row">
          <span className="meeting-label">Meetings</span>
          <span className="meeting-percent">{Math.round(meetingPct)}%</span>
          <span className="meeting-hours">({meetings.toFixed(1)}h)</span>
        </div>
        <div className="meeting-row">
          <span className="meeting-label">Focus Time</span>
          <span className="meeting-percent">{Math.round(focusPct)}%</span>
          <span className="meeting-hours">({focusTime.toFixed(1)}h)</span>
        </div>
        <div className="meeting-row">
          <span className="meeting-label">Admin</span>
          <span className="meeting-percent">{Math.round(adminPct)}%</span>
          <span className="meeting-hours">({admin.toFixed(1)}h)</span>
        </div>
      </div>
      <div className="meeting-divider"></div>
      <div className="meeting-insight">
        <p className="insight-text">
          {meetingPct > 60 ? (
            <>High meeting load. Consider blocking focus time.</>
          ) : meetingPct < 30 ? (
            <>Good balance. Focus time is well protected.</>
          ) : (
            <>Meetings and focus time are balanced.</>
          )}
        </p>
      </div>
    </div>
  );
}

export default MeetingVsFocusTimeCard;
