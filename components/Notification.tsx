
import React, { useState, useEffect } from 'react';
import { NotificationType } from '../hooks/useNotification';

interface NotificationProps {
  message: string;
  type: NotificationType;
}

const ICONS: Record<NotificationType, string> = {
  success: 'fas fa-check-circle',
  error: 'fas fa-exclamation-circle',
  info: 'fas fa-info-circle',
};

const BG_COLORS: Record<NotificationType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

export const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in when the component mounts
    const timer = setTimeout(() => {
        setVisible(true);
    }, 10); // small delay to ensure transition is applied
    
    return () => clearTimeout(timer);
  }, []);

  const iconClass = ICONS[type];
  const bgColorClass = BG_COLORS[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out ${bgColorClass} ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
    >
      <i className={`${iconClass} mr-2`}></i>
      {message}
    </div>
  );
};
