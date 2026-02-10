import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} from '../api/notifications';
import { Notification, NotificationListParams } from '../types/api.types';

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
  fetchNotifications: (params?: NotificationListParams) => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markNotificationAsRead: (id: string | number) => Promise<boolean>;
  markAllNotificationsAsRead: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

export const useNotifications = (params?: NotificationListParams): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Use ref to store params to avoid dependency issues
  const paramsRef = useRef(params);

  // Update ref when params change
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const fetchNotifications = useCallback(async (fetchParams?: NotificationListParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNotifications(fetchParams || paramsRef.current);
      if (response.success && response.data) {
        setNotifications(response.data);
      } else {
        setError(response.message || 'Failed to fetch notifications');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - uses ref instead

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await getUnreadCount();
      if (response.success && response.data) {
        setUnreadCount(response.data.unread_count);
      }
    } catch (err: any) {
      console.error('Failed to fetch unread count:', err);
    }
  }, []);

  const markNotificationAsRead = useCallback(async (id: string | number): Promise<boolean> => {
    try {
      const response = await markAsRead(id);
      if (response.success) {
        // Update local state
        setNotifications(prev =>
          prev.map(notif =>
            notif.id === id ? { ...notif, read_at: new Date().toISOString() } : notif
          )
        );
        // Decrement unread count
        setUnreadCount(prev => Math.max(0, prev - 1));
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Failed to mark notification as read:', err);
      return false;
    }
  }, []);

  const markAllNotificationsAsRead = useCallback(async (): Promise<boolean> => {
    try {
      const response = await markAllAsRead();
      if (response.success) {
        // Update local state
        setNotifications(prev =>
          prev.map(notif => ({ ...notif, read_at: new Date().toISOString() }))
        );
        setUnreadCount(0);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Failed to mark all notifications as read:', err);
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([fetchNotifications(), fetchUnreadCount()]);
  }, [fetchNotifications, fetchUnreadCount]);

  // Only run on mount
  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []); // Empty dependency array - only run once on mount

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    refresh,
  };
};

export default useNotifications;
