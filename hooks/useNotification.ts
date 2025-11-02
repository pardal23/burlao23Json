
import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationPayload {
  message: string;
  type: NotificationType;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationPayload | null>(null);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    // Optional: return a cleanup function if needed, though not strictly necessary here
    return () => clearTimeout(timer);
  }, []);

  return { notification, showNotification };
};
