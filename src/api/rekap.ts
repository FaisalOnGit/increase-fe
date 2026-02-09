import apiClient from "./client";
import {
  RekapProposalParams,
  RekapProposalResponse,
  RekapDetailParams,
  RekapDetailResponse,
} from "../types/api.types";

/**
 * Get proposal recap grouped by fakultas and prodi
 * GET /rekap-proposal
 */
export const getRekapProposal = async (
  params?: RekapProposalParams
): Promise<RekapProposalResponse> => {
  try {
    const response = await apiClient.get<RekapProposalResponse>("/rekap-proposal", {
      params,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch proposal recap",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get proposal detail by fakultas or prodi
 * GET /rekap-proposal/detail
 */
export const getRekapDetail = async (
  params: RekapDetailParams
): Promise<RekapDetailResponse> => {
  try {
    const response = await apiClient.get<RekapDetailResponse>(
      "/rekap-proposal/detail",
      { params }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch proposal details",
      errors: error.response?.data?.errors,
    };
  }
};
