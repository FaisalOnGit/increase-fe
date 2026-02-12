import { useState } from "react";
import {
  getReviewerProposals,
  getAvailableReviewers,
  setReviewers,
  addReviewers,
  adminApproveProposal,
  adminRejectProposal,
} from "../api/reviewer";
import {
  ReviewerProposal,
  ReviewerListParams,
  AvailableReviewer,
  SetReviewersData,
  AdminActionData,
} from "../types/api.types";

export const useReviewerManagement = () => {
  const [proposals, setProposals] = useState<ReviewerProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  } | null>(null);

  const fetchProposals = async (params?: ReviewerListParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getReviewerProposals(params);
      if (response.success && response.data) {
        setProposals(response.data);
        setMeta(response.meta || null);
      } else {
        setError(response.message || "Failed to fetch proposals");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableReviewers = async (
    proposal_id?: number,
    search?: string
  ): Promise<AvailableReviewer[]> => {
    try {
      const response = await getAvailableReviewers(proposal_id, search);
      if (response.success && response.data) {
        return response.data;
      }
      return [];
    } catch (err: any) {
      console.error("Error fetching available reviewers:", err);
      return [];
    }
  };

  const assignReviewers = async (
    proposal: number,
    data: SetReviewersData
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await setReviewers(proposal, data);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to assign reviewers");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const addMoreReviewers = async (
    proposal: number,
    data: SetReviewersData
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addReviewers(proposal, data);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to add reviewers");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const approveProposal = async (
    proposal: number,
    data?: AdminActionData
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminApproveProposal(proposal, data);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to approve proposal");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const rejectProposal = async (
    proposal: number,
    data: AdminActionData
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminRejectProposal(proposal, data);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to reject proposal");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    proposals,
    loading,
    error,
    meta,
    fetchProposals,
    fetchAvailableReviewers,
    assignReviewers,
    addMoreReviewers,
    approveProposal,
    rejectProposal,
  };
};
