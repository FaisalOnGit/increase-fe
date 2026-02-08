import apiClient from './client';
import {
  JenisPKMListResponse,
  SingleJenisPKMResponse,
  ActiveJenisPKMResponse,
  CreateJenisPKM,
  UpdateJenisPKM,
  JenisPKMListParams,
} from '../types/api.types';

/**
 * Get paginated list of PKM
 * GET /pkm
 */
export const getPKMs = async (params?: JenisPKMListParams): Promise<JenisPKMListResponse> => {
  try {
    const response = await apiClient.get<JenisPKMListResponse>('/pkm', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch PKM types',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get all active PKM (for dropdowns)
 * GET /pkm/active/all
 */
export const getActivePKMs = async (): Promise<ActiveJenisPKMResponse> => {
  try {
    const response = await apiClient.get<ActiveJenisPKMResponse>('/pkm/active/all');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch active PKM types',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get PKM detail by ID
 * GET /pkm/{id}
 */
export const getPKMById = async (id: number): Promise<SingleJenisPKMResponse> => {
  try {
    const response = await apiClient.get<SingleJenisPKMResponse>(`/pkm/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch PKM type',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Create a new PKM
 * POST /pkm
 */
export const createPKM = async (data: CreateJenisPKM): Promise<SingleJenisPKMResponse> => {
  try {
    const response = await apiClient.post<SingleJenisPKMResponse>('/pkm', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create PKM type',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update a PKM
 * PUT /pkm/{id}
 */
export const updatePKM = async (id: number, data: UpdateJenisPKM): Promise<SingleJenisPKMResponse> => {
  try {
    const response = await apiClient.put<SingleJenisPKMResponse>(`/pkm/${id}`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update PKM type',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete a PKM
 * DELETE /pkm/{id}
 */
export const deletePKM = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/pkm/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete PKM type',
    };
  }
};

/**
 * Toggle PKM active status
 * PATCH /pkm/{id}/toggle-active
 */
export const togglePKMStatus = async (
  id: number
): Promise<SingleJenisPKMResponse> => {
  try {
    const response = await apiClient.patch<SingleJenisPKMResponse>(`/pkm/${id}/toggle-active`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to toggle PKM status',
      errors: error.response?.data?.errors,
    };
  }
};
