import apiClient from './client';
import {
  User,
  CreateUser,
  UpdateUser,
  UserListParams,
  UserListResponse,
  SingleUserResponse,
} from '../types/api.types';

/**
 * Get paginated list of users with search and filter capabilities
 * GET /users
 */
export const getUsers = async (params?: UserListParams): Promise<UserListResponse> => {
  try {
    const response = await apiClient.get<UserListResponse>('/users', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch users',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get a specific user by ID
 * GET /users/{id}
 */
export const getUserById = async (id: number): Promise<SingleUserResponse> => {
  try {
    const response = await apiClient.get<SingleUserResponse>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Create a new user
 * POST /users
 */
export const createUser = async (data: CreateUser): Promise<SingleUserResponse> => {
  try {
    const response = await apiClient.post<SingleUserResponse>('/users', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create user',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update an existing user
 * PUT /users/{id}
 */
export const updateUser = async (id: number, data: UpdateUser): Promise<SingleUserResponse> => {
  try {
    const response = await apiClient.put<SingleUserResponse>(`/users/${id}`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update user',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete a user
 * DELETE /users/{id}
 */
export const deleteUser = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete user',
    };
  }
};

/**
 * Get available kajur for kaprodi assignment
 * GET /users/available-kajur
 */
export const getAvailableKajur = async (params?: {
  search?: string;
  per_page?: number;
}): Promise<UserListResponse> => {
  try {
    const response = await apiClient.get<UserListResponse>('/users/available-kajur', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch available kajur',
      errors: error.response?.data?.errors,
    };
  }
};
