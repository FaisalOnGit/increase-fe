import apiClient from './client';
import {
  ProdiListResponse,
  SingleProdiResponse,
  CreateProdi,
  UpdateProdi,
  ProdiListParams,
  AssignKaprodiData,
} from '../types/api.types';

/**
 * Get paginated list of study programs
 * GET /prodi
 */
export const getProdis = async (params?: ProdiListParams): Promise<ProdiListResponse> => {
  try {
    const response = await apiClient.get<ProdiListResponse>('/prodi', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch study programs',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get all study programs (without pagination, for dropdowns)
 * GET /prodi/all
 */
export const getAllProdis = async (): Promise<ProdiListResponse> => {
  try {
    const response = await apiClient.get<ProdiListResponse>('/prodi/all');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch study programs',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get study programs by faculty
 * GET /prodi/by-fakultas/{fakultasId}
 */
export const getProdisByFakultas = async (fakultasId: number): Promise<ProdiListResponse> => {
  try {
    const response = await apiClient.get<ProdiListResponse>(`/prodi/by-fakultas/${fakultasId}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch study programs',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get unassigned study programs (without faculty)
 * GET /prodi/unassigned
 */
export const getUnassignedProdis = async (params?: {
  search?: string;
  per_page?: number;
}): Promise<ProdiListResponse> => {
  try {
    const response = await apiClient.get<ProdiListResponse>('/prodi/unassigned', { params });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch unassigned study programs',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get study program details by ID
 * GET /prodi/{id}
 */
export const getProdiById = async (id: number): Promise<SingleProdiResponse> => {
  try {
    const response = await apiClient.get<SingleProdiResponse>(`/prodi/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch study program',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Create a new study program
 * POST /prodi
 */
export const createProdi = async (data: CreateProdi): Promise<SingleProdiResponse> => {
  try {
    const response = await apiClient.post<SingleProdiResponse>('/prodi', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create study program',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update a study program
 * PUT /prodi/{id}
 */
export const updateProdi = async (id: number, data: UpdateProdi): Promise<SingleProdiResponse> => {
  try {
    const response = await apiClient.put<SingleProdiResponse>(`/prodi/${id}`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update study program',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete a study program
 * DELETE /prodi/{id}
 */
export const deleteProdi = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/prodi/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete study program',
    };
  }
};

/**
 * Assign kaprodi to study program
 * POST /prodi/{id}/assign-kaprodi
 */
export const assignKaprodi = async (
  id: number,
  data: AssignKaprodiData
): Promise<SingleProdiResponse> => {
  try {
    const response = await apiClient.post<SingleProdiResponse>(`/prodi/${id}/assign-kaprodi`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to assign kaprodi',
      errors: error.response?.data?.errors,
    };
  }
};
