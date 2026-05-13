import { useState } from 'react';
import { getTaskTypeLabel } from '../utils/chartHelpers';
import './NotesSummary.css';

function NotesSummary({ entries }) {
  const [expandedGroups, setExpandedGroups] = useState({});

  // Group notes by task type
  const notesByTaskType = entries.reduce((acc, entry) => {
    if (!entry.notes || !entry.notes.trim()) {
      return acc; // Skip entries without notes
    }

    const taskType = entry.taskType;
    if (!acc[taskType]) {
      acc[taskType] = [];
    }

    acc[taskType].push({
      date: entry.date,
      note: entry.notes,
      time: entry.time
    });

    return acc;
  }, {});

  const taskTypes = Object.keys(notesByTaskType).sort();

  if (taskTypes.length === 0) {
    return (
      <div className="notes-summary">
        <h3>Notes Summary</h3>
        <p className="empty-state">No notes for selected date range</p>
      </div>
    );
  }

  const toggleGroup = (taskType) => {
    setExpandedGroups(prev => ({
      ...prev,
      [taskType]: !prev[taskType]
    }));
  };

  const handleExportNotes = () => {
    let text = 'Notes Summary\n';
    text += '='.repeat(50) + '\n\n';

    taskTypes.forEach(taskType => {
      const notes = notesByTaskType[taskType];
      const totalHours = notes.reduce((sum, n) => sum + n.time, 0);
      const totalEntries = notes.length;

      text += `${getTaskTypeLabel(taskType)} (${totalEntries} entries, ${totalHours.toFixed(1)}h)\n`;
      text += '-'.repeat(50) + '\n';

      notes.forEach(n => {
        text += `${n.date}: ${n.note}\n`;
      });

      text += '\n';
    });

    // Create and download file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `notes-summary-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="notes-summary">
      <div className="notes-header">
        <h3>Notes Summary</h3>
        <kds-button
          type="button"
          kind="secondary"
          onClick={handleExportNotes}
        >
          Export as Text
        </kds-button>
      </div>

      <div className="notes-groups">
        {taskTypes.map(taskType => {
          const notes = notesByTaskType[taskType];
          const totalHours = notes.reduce((sum, n) => sum + n.time, 0);
          const isExpanded = expandedGroups[taskType];

          return (
            <div key={taskType} className="note-group">
              <button
                type="button"
                className="group-header"
                onClick={() => toggleGroup(taskType)}
              >
                <span className="group-toggle">
                  {isExpanded ? '▼' : '▶'}
                </span>
                <span className="group-title">
                  {getTaskTypeLabel(taskType)}
                </span>
                <span className="group-meta">
                  {notes.length} {notes.length === 1 ? 'entry' : 'entries'}, {totalHours.toFixed(1)}h
                </span>
              </button>

              {isExpanded && (
                <div className="group-content">
                  {notes.map((note, index) => (
                    <div key={index} className="note-item">
                      <div className="note-date">{note.date}</div>
                      <div className="note-text">{note.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotesSummary;
