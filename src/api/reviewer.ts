import apiClient from './client';
import {
  ReviewerProposal,
  ReviewerListParams,
  ReviewerListResponse,
  AvailableReviewer,
  AvailableReviewerResponse,
  SetReviewersData,
  AdminActionData,
  AdminActionResponse,
} from '../types/api.types';

/**
 * Get proposals list for reviewer management
 * GET /reviewer-management
 */
export const getReviewerProposals = async (
  params?: ReviewerListParams
): Promise<ReviewerListResponse> => {
  try {
    const response = await apiClient.get<ReviewerListResponse>('/reviewer-management', {
      params,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch proposals',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get available reviewers
 * GET /reviewer-management/available-reviewers
 */
export const getAvailableReviewers = async (
  proposal_id?: number,
  search?: string,
  per_page: number = 50
): Promise<AvailableReviewerResponse> => {
  try {
    const params: any = { per_page };
    if (proposal_id) params.proposal_id = proposal_id;
    if (search) params.search = search;

    const response = await apiClient.get<AvailableReviewerResponse>(
      '/reviewer-management/available-reviewers',
      { params }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch available reviewers',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Set reviewers for proposal
 * POST /reviewer-management/{proposal}/set-reviewers
 */
export const setReviewers = async (
  proposal: number,
  data: SetReviewersData
): Promise<AdminActionResponse> => {
  try {
    const response = await apiClient.post<AdminActionResponse>(
      `/reviewer-management/${proposal}/set-reviewers`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to set reviewers',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Add reviewers to proposal
 * PATCH /reviewer-management/{proposal}/reviewers
 */
export const addReviewers = async (
  proposal: number,
  data: SetReviewersData
): Promise<AdminActionResponse> => {
  try {
    const response = await apiClient.patch<AdminActionResponse>(
      `/reviewer-management/${proposal}/reviewers`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to add reviewers',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Approve proposal by admin
 * POST /reviewer-management/{proposal}/approve
 */
export const adminApproveProposal = async (
  proposal: number,
  data?: AdminActionData
): Promise<AdminActionResponse> => {
  try {
    const response = await apiClient.post<AdminActionResponse>(
      `/reviewer-management/${proposal}/approve`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to approve proposal',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Reject proposal by admin
 * POST /reviewer-management/{proposal}/reject
 */
export const adminRejectProposal = async (
  proposal: number,
  data: AdminActionData
): Promise<AdminActionResponse> => {
  try {
    const response = await apiClient.post<AdminActionResponse>(
      `/reviewer-management/${proposal}/reject`,
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to reject proposal',
      errors: error.response?.data?.errors,
    };
  }
};
