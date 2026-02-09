import apiClient from "./client";
import {
  MahasiswaProposalListParams,
  MahasiswaProposalListResponse,
  SingleMahasiswaProposalResponse,
  CreateProposalData,
  UpdateProposalData,
  EligibilityCheckResponse,
  AvailablePKMResponse,
  AvailableAnggotaResponse,
  AvailablePembimbingResponse,
} from "../types/api.types";

/**
 * Get my proposals
 * GET /proposals
 */
export const getMyProposals = async (
  params?: MahasiswaProposalListParams
): Promise<MahasiswaProposalListResponse> => {
  try {
    const response = await apiClient.get<MahasiswaProposalListResponse>("/proposals", {
      params,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch proposals",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get proposal detail
 * GET /proposals/{id}
 */
export const getProposalDetail = async (
  id: number
): Promise<SingleMahasiswaProposalResponse> => {
  try {
    const response = await apiClient.get<SingleMahasiswaProposalResponse>(
      `/proposals/${id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch proposal detail",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Submit new proposal
 * POST /proposals
 */
export const createProposal = async (
  data: CreateProposalData
): Promise<SingleMahasiswaProposalResponse> => {
  try {
    const formData = new FormData();
    formData.append("judul", data.judul);
    formData.append("pkm_id", data.pkm_id.toString());
    formData.append("pembimbing_id", data.pembimbing_id.toString());

    // Append anggota_ids as array
    data.anggota_ids.forEach((id) => {
      formData.append("anggota_ids[]", id.toString());
    });

    formData.append("file_proposal", data.file_proposal);

    const response = await apiClient.post<SingleMahasiswaProposalResponse>(
      "/proposals",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit proposal",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Update proposal
 * POST /proposals/{id}
 */
export const updateProposal = async (
  id: number,
  data: UpdateProposalData
): Promise<SingleMahasiswaProposalResponse> => {
  try {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("judul", data.judul);

    if (data.file_proposal) {
      formData.append("file_proposal", data.file_proposal);
    }

    const response = await apiClient.post<SingleMahasiswaProposalResponse>(
      `/proposals/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update proposal",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Delete proposal
 * DELETE /proposals/{id}
 */
export const deleteProposal = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/proposals/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete proposal",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Check eligibility
 * GET /proposals/check-eligibility
 */
export const checkEligibility = async (): Promise<EligibilityCheckResponse> => {
  try {
    const response = await apiClient.get<EligibilityCheckResponse>(
      "/proposals/check-eligibility"
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to check eligibility",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get available PKM types
 * GET /proposals/available-pkm
 */
export const getAvailablePKM = async (): Promise<AvailablePKMResponse> => {
  try {
    const response = await apiClient.get<AvailablePKMResponse>(
      "/proposals/available-pkm"
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch available PKM",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get available anggota
 * GET /proposals/available-anggota
 */
export const getAvailableAnggota = async (
  search?: string,
  per_page: number = 50
): Promise<AvailableAnggotaResponse> => {
  try {
    const response = await apiClient.get<AvailableAnggotaResponse>(
      "/proposals/available-anggota",
      {
        params: { search, per_page },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch available anggota",
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Get available pembimbing
 * GET /proposals/available-pembimbing
 */
export const getAvailablePembimbing = async (
  search?: string,
  per_page: number = 50
): Promise<AvailablePembimbingResponse> => {
  try {
    const response = await apiClient.get<AvailablePembimbingResponse>(
      "/proposals/available-pembimbing",
      {
        params: { search, per_page },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch available pembimbing",
      errors: error.response?.data?.errors,
    };
  }
};
