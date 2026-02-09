import apiClient from './client';
import {
  Dosen,
  DosenListParams,
  DosenListResponse,
  UpdateDosenQuotaData,
  SingleDosenResponse,
} from '../types/api.types';

/**
 * Get list of dosen/pembimbing
 * GET /dosen or /pembimbing
 */
export const getDosenList = async (
  params?: DosenListParams
): Promise<DosenListResponse> => {
  try {
    const response = await apiClient.get<DosenListResponse>('/pembimbing', {
      params,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch dosen list',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get dosen detail
 * GET /pembimbing/{id}
 */
export const getDosenDetail = async (id: number): Promise<SingleDosenResponse> => {
  try {
    const response = await apiClient.get<SingleDosenResponse>(`/pembimbing/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch dosen detail',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update dosen quota
 * PUT /pembimbing/{id}/quota
 */
export const updateDosenQuota = async (
  id: number,
  data: UpdateDosenQuotaData
): Promise<SingleDosenResponse> => {
  try {
    const response = await apiClient.put<SingleDosenResponse>(
      `/pembimbing/${id}/kuota`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update dosen quota',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Reset dosen quota
 * POST /pembimbing/{id}/reset-quota
 */
export const resetDosenQuota = async (id: number): Promise<SingleDosenResponse> => {
  try {
    const response = await apiClient.post<SingleDosenResponse>(
      `/pembimbing/${id}/reset-kuota`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to reset dosen quota',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete dosen
 * DELETE /pembimbing/{id}
 */
export const deleteDosen = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/pembimbing/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete dosen',
      errors: error.response?.data?.errors,
    };
  }
};
