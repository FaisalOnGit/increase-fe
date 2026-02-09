import apiClient from './client';
import {
  Proposal,
  ProposalDetail,
  ProposalListParams,
  ProposalListResponse,
  SingleProposalResponse,
  ApproveRejectData,
} from '../types/api.types';

/**
 * Get paginated list of proposals assigned to pembimbing
 * GET /pembimbing/proposals
 */
export const getPembimbingProposals = async (
  params?: ProposalListParams
): Promise<ProposalListResponse> => {
  try {
    const response = await apiClient.get<ProposalListResponse>('/pembimbing/proposals', {
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
 * Get detailed information of a proposal assigned to pembimbing
 * GET /pembimbing/proposals/{id}
 */
export const getProposalDetail = async (id: number): Promise<SingleProposalResponse> => {
  try {
    const response = await apiClient.get<SingleProposalResponse>(
      `/pembimbing/proposals/${id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch proposal detail',
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Approve a proposal assigned to pembimbing
 * POST /pembimbing/proposals/{id}/approve
 */
export const approveProposal = async (
  id: number,
  data?: ApproveRejectData
): Promise<SingleProposalResponse> => {
  try {
    const response = await apiClient.post<SingleProposalResponse>(
      `/pembimbing/proposals/${id}/approve`,
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
 * Reject a proposal assigned to pembimbing
 * POST /pembimbing/proposals/{id}/reject
 * Note: catatan is required for rejection
 */
export const rejectProposal = async (
  id: number,
  data: ApproveRejectData
): Promise<SingleProposalResponse> => {
  try {
    const response = await apiClient.post<SingleProposalResponse>(
      `/pembimbing/proposals/${id}/reject`,
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
