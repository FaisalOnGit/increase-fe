import apiClient from './client';
import {
  FacultyListResponse,
  SingleFacultyResponse,
  CreateFaculty,
  UpdateFaculty,
  FacultyListParams,
} from '../types/api.types';

/**
 * Get paginated list of faculties
 * GET /fakultas
 */
export const getFaculties = async (params?: FacultyListParams): Promise<FacultyListResponse> => {
  try {
    const response = await apiClient.get<FacultyListResponse>('/fakultas', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch faculties',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get all faculties (without pagination, for dropdowns)
 * GET /fakultas/all
 */
export const getAllFaculties = async (): Promise<FacultyListResponse> => {
  try {
    const response = await apiClient.get<FacultyListResponse>('/fakultas/all');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch faculties',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get faculty details by ID
 * GET /fakultas/{id}
 */
export const getFacultyById = async (id: number): Promise<SingleFacultyResponse> => {
  try {
    const response = await apiClient.get<SingleFacultyResponse>(`/fakultas/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch faculty',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Create a new faculty
 * POST /fakultas
 */
export const createFaculty = async (data: CreateFaculty): Promise<SingleFacultyResponse> => {
  try {
    const response = await apiClient.post<SingleFacultyResponse>('/fakultas', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create faculty',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update a faculty
 * PUT /fakultas/{id}
 */
export const updateFaculty = async (id: number, data: UpdateFaculty): Promise<SingleFacultyResponse> => {
  try {
    const response = await apiClient.put<SingleFacultyResponse>(`/fakultas/${id}`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update faculty',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete a faculty
 * DELETE /fakultas/{id}
 */
export const deleteFaculty = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/fakultas/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete faculty',
    };
  }
};
