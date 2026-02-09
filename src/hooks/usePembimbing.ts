import { useState, useEffect } from "react";
import {
  getPembimbingProposals,
  getProposalDetail,
  approveProposal,
  rejectProposal,
} from "../api/pembimbing";
import {
  Proposal,
  ProposalDetail,
  ProposalListParams,
  ApproveRejectData,
} from "../types/api.types";

export const usePembimbingProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  } | null>(null);

  const fetchProposals = async (params?: ProposalListParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPembimbingProposals(params);
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

  const fetchDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProposalDetail(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || "Failed to fetch proposal detail");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id: number, data?: ApproveRejectData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await approveProposal(id, data);
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

  const reject = async (id: number, data: ApproveRejectData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rejectProposal(id, data);
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
    fetchDetail,
    approve,
    reject,
  };
};

export const usePembimbingProposalDetail = (id: number) => {
  const [detail, setDetail] = useState<ProposalDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProposalDetail(id);
      if (response.success && response.data) {
        setDetail(response.data);
      } else {
        setError(response.message || "Failed to fetch proposal detail");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  return {
    detail,
    loading,
    error,
    refetch: fetchDetail,
  };
};
