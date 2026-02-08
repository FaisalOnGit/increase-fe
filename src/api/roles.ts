import apiClient from './client';
import { RoleListResponse, SingleRoleResponse } from '../types/api.types';

/**
 * Get all available roles
 * GET /roles
 */
export const getRoles = async (): Promise<RoleListResponse> => {
  try {
    const response = await apiClient.get<RoleListResponse>('/roles');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch roles',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get role details by name
 * GET /roles/{name}
 */
export const getRoleByName = async (name: string): Promise<SingleRoleResponse> => {
  try {
    const response = await apiClient.get<SingleRoleResponse>(`/roles/${name}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch role details',
      errors: error.response?.data?.errors,
    };
  }
};
