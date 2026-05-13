import React, { useEffect, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';
import './NotificationContainer.css';

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  function getPalette(type) {
    switch (type) {
      case 'success':
        return 'positive';
      case 'error':
        return 'negative';
      case 'warning':
        return 'special';
      case 'info':
      default:
        return 'informative';
    }
  }

  function getRole(type) {
    // Use alert role for errors to announce immediately for accessibility
    return type === 'error' ? 'alert' : 'status';
  }

  useEffect(() => {
    // Set up event listeners for message close events
    const handleMessageClosed = (event) => {
      // Prevent default behavior and stop propagation
      event.preventDefault();
      event.stopPropagation();

      const messageElement = event.target;
      const notificationId = messageElement.getAttribute('data-notification-id');
      if (notificationId) {
        removeNotification(notificationId);
      }
    };

    // Add listener to document for bubbled events
    document.addEventListener('messageClosed', handleMessageClosed);

    return () => {
      document.removeEventListener('messageClosed', handleMessageClosed);
    };
  }, [removeNotification]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      <div className="kds-MessageGroup">
        {notifications.map((notification) => (
          <kds-message
            key={notification.id}
            data-notification-id={notification.id}
            palette={getPalette(notification.type)}
            role={getRole(notification.type)}
            closable="true"
            variant="fill"
          >
            {notification.message}
          </kds-message>
        ))}
      </div>
    </div>
  );
}

export default NotificationContainer;
