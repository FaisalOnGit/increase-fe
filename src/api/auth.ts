import apiClient from './client';
import {
  LoginCredentials,
  RegisterData,
  LoginResponse,
  RegisterResponse,
  UserResponse,
  LogoutResponse,
} from '../types/api.types';

/**
 * Login user with email and password
 * POST /auth/login
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

    // Store token and user data in sessionStorage
    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Register a new user
 * POST /auth/register
 */
export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);

    // Store token and user data in sessionStorage
    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Logout current user
 * POST /auth/logout
 */
export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await apiClient.post<LogoutResponse>('/auth/logout');

    // Clear sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    return response.data;
  } catch (error: any) {
    // Even if API call fails, clear local storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed',
    };
  }
};

/**
 * Get authenticated user data
 * GET /auth/user
 */
export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await apiClient.get<UserResponse>('/auth/user');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user data',
    };
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = sessionStorage.getItem('token');
  return !!token;
};

/**
 * Get stored user data
 */
export const getStoredUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};
