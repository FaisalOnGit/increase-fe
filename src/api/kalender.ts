import apiClient from './client';
import {
  PKMKalenderListResponse,
  SinglePKMKalenderResponse,
  CreatePKMKalender,
  UpdatePKMKalender,
  PKMKalenderListParams,
} from '../types/api.types';

/**
 * Get paginated list of PKM Kalender
 * GET /pkm-kalender
 */
export const getKalenders = async (params?: PKMKalenderListParams): Promise<PKMKalenderListResponse> => {
  try {
    const response = await apiClient.get<any>('/pkm-kalender', { params });

    // Handle API response format without success field
    if (response.data && response.data.data) {
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta,
      };
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch calendars',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get active/current kalender
 * GET /pkm-kalender/active/current
 */
export const getActiveKalender = async (): Promise<SinglePKMKalenderResponse> => {
  try {
    const response = await apiClient.get<SinglePKMKalenderResponse>('/pkm-kalender/active/current');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch active calendar',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get kalender detail by ID
 * GET /pkm-kalender/{id}
 */
export const getKalenderById = async (id: number): Promise<SinglePKMKalenderResponse> => {
  try {
    const response = await apiClient.get<SinglePKMKalenderResponse>(`/pkm-kalender/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch calendar',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Create a new PKM Kalender
 * POST /pkm-kalender
 */
export const createKalender = async (data: CreatePKMKalender): Promise<SinglePKMKalenderResponse> => {
  try {
    const response = await apiClient.post<SinglePKMKalenderResponse>('/pkm-kalender', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create calendar',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update a PKM Kalender
 * PUT /pkm-kalender/{id}
 */
export const updateKalender = async (id: number, data: UpdatePKMKalender): Promise<SinglePKMKalenderResponse> => {
  try {
    const response = await apiClient.put<SinglePKMKalenderResponse>(`/pkm-kalender/${id}`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update calendar',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete a PKM Kalender
 * DELETE /pkm-kalender/{id}
 */
export const deleteKalender = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/pkm-kalender/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete calendar',
    };
  }
};

/**
 * Activate a kalender (and deactivate all others)
 * PATCH /pkm-kalender/{id}/activate
 */
export const activateKalender = async (id: number): Promise<SinglePKMKalenderResponse> => {
  try {
    const response = await apiClient.patch<SinglePKMKalenderResponse>(`/pkm-kalender/${id}/activate`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to activate calendar',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Deactivate a kalender
 * PATCH /pkm-kalender/{id}/deactivate
 */
export const deactivateKalender = async (id: number): Promise<SinglePKMKalenderResponse> => {
  try {
    const response = await apiClient.patch<SinglePKMKalenderResponse>(`/pkm-kalender/${id}/deactivate`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to deactivate calendar',
      errors: error.response?.data?.errors,
    };
  }
};
