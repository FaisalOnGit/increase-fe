import apiClient from './client';
import {
  Notification,
  NotificationListParams,
  NotificationListResponse,
  MarkAsReadResponse,
  ReadAllResponse,
  UnreadCountResponse,
} from '../types/api.types';

/**
 * Get user notifications
 * GET /notifications
 */
export const getNotifications = async (
  params?: NotificationListParams
): Promise<NotificationListResponse> => {
  try {
    const response = await apiClient.get<NotificationListResponse>('/notifications', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch notifications',
    };
  }
};

/**
 * Mark notification as read
 * POST /notifications/{notification}/read
 */
export const markAsRead = async (notificationId: string | number): Promise<MarkAsReadResponse> => {
  try {
    const response = await apiClient.post<MarkAsReadResponse>(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to mark notification as read',
    };
  }
};

/**
 * Mark all notifications as read
 * POST /notifications/read-all
 */
export const markAllAsRead = async (): Promise<ReadAllResponse> => {
  try {
    const response = await apiClient.post<ReadAllResponse>('/notifications/read-all');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to mark all notifications as read',
    };
  }
};

/**
 * Get unread notifications count
 * GET /notifications/unread-count
 */
export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  try {
    const response = await apiClient.get<UnreadCountResponse>('/notifications/unread-count');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch unread count',
      data: { unread_count: 0 },
    };
  }
};
