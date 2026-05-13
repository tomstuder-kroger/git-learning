import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { addEntry, getLearnedValues, learnValue } from '../utils/storage';
import { useNotification } from '../context/NotificationContext';
import './TimeEntry.css';

function TimeEntry() {
  const { showSuccess, showError } = useNotification();

  // Form state
  const [date, setDate] = useState(getTodayDate());
  const [taskType, setTaskType] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [taskCode, setTaskCode] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [impact, setImpact] = useState('');
  const [roleExpectations, setRoleExpectations] = useState([]);
  const [customFields, setCustomFields] = useState({});
  const [notes, setNotes] = useState('');

  // UI state
  const [showAutoFilled, setShowAutoFilled] = useState(false);
  const [learnedValues, setLearnedValues] = useState({});

  // Refs for web components
  const taskTypeSelectorRef = React.useRef(null);

  // Load learned values on mount
  useEffect(() => {
    setLearnedValues(getLearnedValues());
  }, []);

  // Set up mx-single-select event listener and items for task type
  useEffect(() => {
    const taskTypeSelector = taskTypeSelectorRef.current;
    if (!taskTypeSelector) return;

    // Prepare items in the format mx-single-select expects
    const taskTypeItems = APP_CONFIG.taskTypes.map(t => ({
      label: t.label,
      value: t.id
    }));

    // Set items property directly on the web component
    taskTypeSelector.items = taskTypeItems;

    const handleTaskTypeChange = (event) => {
      const selectedItem = event.detail;
      if (selectedItem && selectedItem.value) {
        setTaskType(selectedItem.value);
      }
    };

    taskTypeSelector.addEventListener('itemChange', handleTaskTypeChange);
    return () => {
      taskTypeSelector.removeEventListener('itemChange', handleTaskTypeChange);
    };
  }, []);

  // Sync mx-single-select selection with taskType state
  useEffect(() => {
    const taskTypeSelector = taskTypeSelectorRef.current;
    if (!taskTypeSelector || !taskTypeSelector.items) return;

    if (taskType) {
      // Find and set the selected item
      const selectedItem = taskTypeSelector.items.find(item => item.value === taskType);
      if (selectedItem) {
        taskTypeSelector.itemSelected = selectedItem;
      }
    } else {
      // Clear selection if taskType is empty
      if (taskTypeSelector.clearSelection) {
        taskTypeSelector.clearSelection();
      }
    }
  }, [taskType]);

  // Update form when task type changes
  useEffect(() => {
    if (!taskType) return;

    const selectedTaskType = APP_CONFIG.taskTypes.find(t => t.id === taskType);
    if (!selectedTaskType) return;

    // Set default time
    setTime(selectedTaskType.defaultTime || '');

    // Auto-fill category and taskCode
    if (selectedTaskType.autoFill) {
      setCategory(selectedTaskType.autoFill.category || '');
      setTaskCode(selectedTaskType.autoFill.taskCode || '');
    }

    // Reset custom fields
    const newCustomFields = {};
    selectedTaskType.customFields.forEach(field => {
      newCustomFields[field] = '';
    });
    setCustomFields(newCustomFields);
  }, [taskType]);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function handleCustomFieldChange(fieldName, value) {
    setCustomFields(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }

  function handleClear() {
    setTaskType('');
    setTime('');
    setCategory('');
    setTaskCode('');
    setPortfolio('');
    setImpact('');
    setRoleExpectations([]);
    setCustomFields({});
    setNotes('');
    setShowAutoFilled(false);

    // Clear mx-single-select
    if (taskTypeSelectorRef.current && taskTypeSelectorRef.current.clearSelection) {
      taskTypeSelectorRef.current.clearSelection();
    }
  }

  function handleSave() {
    // Validation
    if (!taskType) {
      showError('Please select a task type');
      return;
    }
    if (!time || isNaN(parseFloat(time))) {
      showError('Please enter a valid time');
      return;
    }

    // Build entry object
    const entry = {
      date,
      taskType,
      time: parseFloat(time),
      category,
      taskCode,
      portfolio,
      impact,
      roleExpectations,
      customFields,
      notes: notes.trim()
    };

    try {
      // Save entry
      addEntry(entry);

      // Learn custom field values
      Object.entries(customFields).forEach(([fieldName, value]) => {
        if (value) {
          learnValue(fieldName, value);
        }
      });

      // Update learned values state
      setLearnedValues(getLearnedValues());

      // Clear form
      handleClear();

      // Show success message
      const taskTypeLabel = APP_CONFIG.taskTypes.find(t => t.id === taskType)?.label || 'Entry';
      showSuccess(`${taskTypeLabel} saved successfully! (${time}h on ${date})`);
    } catch (error) {
      showError('Failed to save time entry. Please try again.');
      console.error('Error saving entry:', error);
    }
  }

  const selectedTaskType = APP_CONFIG.taskTypes.find(t => t.id === taskType);

  return (
    <div className="time-entry-view">
      <h2>Log Time Entry</h2>

      <form className="time-entry-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="entry-date" className="kds-Label">Date *</label>
          <input
            id="entry-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="kds-Input"
            required
          />
        </div>

        {/* Task Type Selector */}
        <div className="form-group">
          <div className="task-type-selector-wrapper">
            {selectedTaskType && (
              <div className="task-type-icon">
                {React.createElement(selectedTaskType.icon, {
                  size: 'm'
                })}
              </div>
            )}
            <mx-single-select
              ref={taskTypeSelectorRef}
              label="Task Type *"
              input-id="task-type"
              place-holder="Select a task type"
              display-filter-search={true}
              filter-search-placeholder="Search task types..."
              enable-drop-up={false}
              width="100%"
            />
          </div>
        </div>

        {/* Show rest of form only when task type is selected */}
        {taskType && selectedTaskType && (
          <>
            {/* Time Input */}
            <div className="form-group">
              <label htmlFor="time-input" className="kds-Label">
                Time (hours) *
              </label>
              <input
                id="time-input"
                type="number"
                step="0.25"
                min="0"
                max="24"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="kds-Input"
                placeholder="e.g., 0.5, 1, 2"
                required
              />
            </div>

            {/* Custom Fields (participant, domain, etc.) */}
            {selectedTaskType.customFields.map(fieldName => (
              <div key={fieldName} className="form-group">
                <label htmlFor={`custom-${fieldName}`} className="kds-Label">
                  {getFieldLabel(fieldName)}
                </label>
                <input
                  id={`custom-${fieldName}`}
                  type="text"
                  value={customFields[fieldName] || ''}
                  onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
                  className="kds-Input"
                  list={learnedValues[fieldName]?.length ? `${fieldName}-datalist` : undefined}
                />
                {learnedValues[fieldName]?.length > 0 && (
                  <datalist id={`${fieldName}-datalist`}>
                    {learnedValues[fieldName].map((value, idx) => (
                      <option key={idx} value={value} />
                    ))}
                  </datalist>
                )}
              </div>
            ))}

            {/* Auto-filled fields (collapsed by default) */}
            <div className="auto-filled-section">
              <button
                type="button"
                className="toggle-auto-filled"
                onClick={() => setShowAutoFilled(!showAutoFilled)}
              >
                {showAutoFilled ? '▼' : '▶'} Auto-filled fields (click to {showAutoFilled ? 'hide' : 'edit'})
              </button>

              {showAutoFilled && (
                <div className="auto-filled-fields">
                  <div className="form-group">
                    <label htmlFor="category" className="kds-Label">Category</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="kds-Select"
                    >
                      <option value="">Select category</option>
                      {APP_CONFIG.categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="task-code" className="kds-Label">Task Code</label>
                    <select
                      id="task-code"
                      value={taskCode}
                      onChange={(e) => setTaskCode(e.target.value)}
                      className="kds-Select"
                    >
                      <option value="">Select task code</option>
                      {APP_CONFIG.taskCodes.map(code => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <div className="form-group">
              <label htmlFor="portfolio" className="kds-Label">Portfolio</label>
              <select
                id="portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="kds-Select"
              >
                <option value="">Select portfolio</option>
                {APP_CONFIG.portfolios.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Impact */}
            <div className="form-group">
              <label htmlFor="impact" className="kds-Label">Impact</label>
              <select
                id="impact"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                className="kds-Select"
              >
                <option value="">Select impact</option>
                {APP_CONFIG.impacts.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            {/* Role Expectations (multi-select) */}
            <div className="form-group">
              <label className="kds-Label">Role Expectations</label>
              <div className="checkbox-group">
                {APP_CONFIG.roleExpectations.map(expectation => (
                  <label key={expectation} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={expectation}
                      checked={roleExpectations.includes(expectation)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRoleExpectations([...roleExpectations, expectation]);
                        } else {
                          setRoleExpectations(roleExpectations.filter(r => r !== expectation));
                        }
                      }}
                    />
                    {expectation}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label htmlFor="notes" className="kds-Label">
                Notes ({notes.length}/200)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                className="kds-Textarea"
                rows="3"
                placeholder="Optional notes about this entry"
                maxLength={200}
              />
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="button" onClick={handleClear} className="btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn-primary">
                Save Entry
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function getFieldLabel(fieldName) {
  const labels = {
    participant: 'Participant',
    domain: 'Domain',
    focusArea: 'Focus Area',
    topic: 'Topic',
    subtype: 'Subtype',
    issue: 'Issue'
  };
  return labels[fieldName] || fieldName;
}

export default TimeEntry;
