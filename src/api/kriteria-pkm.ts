import apiClient from './client';
import {
  KriteriaPKMListResponse,
  SingleKriteriaPKMResponse,
  CreateKriteriaPKM,
  UpdateKriteriaPKM,
  DuplicateKriteriaPKM,
  ReorderKriteriaPKM,
} from '../types/api.types';

/**
 * Get all kriteria for a specific PKM with summary
 * GET /pkm/{pkmId}/kriteria
 */
export const getKriteriaByPKMId = async (
  pkmId: number
): Promise<KriteriaPKMListResponse> => {
  try {
    const response = await apiClient.get<KriteriaPKMListResponse>(
      `/pkm/${pkmId}/kriteria`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch kriteria',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get kriteria detail by ID
 * GET /pkm-kriteria/{id}
 */
export const getKriteriaById = async (
  id: number
): Promise<SingleKriteriaPKMResponse> => {
  try {
    const response = await apiClient.get<SingleKriteriaPKMResponse>(
      `/pkm-kriteria/${id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch kriteria',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Create a new kriteria for a PKM
 * POST /pkm/{pkmId}/kriteria
 */
export const createKriteria = async (
  pkmId: number,
  data: Omit<CreateKriteriaPKM, 'pkm_id'>
): Promise<SingleKriteriaPKMResponse> => {
  try {
    const response = await apiClient.post<SingleKriteriaPKMResponse>(
      `/pkm/${pkmId}/kriteria`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create kriteria',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update an existing kriteria
 * PUT /pkm-kriteria/{id}
 */
export const updateKriteria = async (
  id: number,
  data: UpdateKriteriaPKM
): Promise<SingleKriteriaPKMResponse> => {
  try {
    const response = await apiClient.put<SingleKriteriaPKMResponse>(
      `/pkm-kriteria/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update kriteria',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete a kriteria (soft delete)
 * DELETE /pkm-kriteria/{id}
 */
export const deleteKriteria = async (
  id: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/pkm-kriteria/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete kriteria',
    };
  }
};

/**
 * Duplicate kriteria from source PKM to target PKM
 * POST /pkm/{sourcePkmId}/kriteria/duplicate
 */
export const duplicateKriteria = async (
  sourcePkmId: number,
  data: DuplicateKriteriaPKM
): Promise<KriteriaPKMListResponse> => {
  try {
    const response = await apiClient.post<KriteriaPKMListResponse>(
      `/pkm/${sourcePkmId}/kriteria/duplicate`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to duplicate kriteria',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Reorder kriteria (for drag & drop)
 * POST /pkm/{pkmId}/kriteria/reorder
 */
export const reorderKriteria = async (
  pkmId: number,
  data: ReorderKriteriaPKM
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>(`/pkm/${pkmId}/kriteria/reorder`, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to reorder kriteria',
    };
  }
};
