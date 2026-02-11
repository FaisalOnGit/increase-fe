import { useState, useEffect } from "react";
import {
  getMyProposals,
  getProposalDetail,
  createProposal,
  updateProposal,
  deleteProposal,
  checkEligibility,
  getAvailablePKM,
  getAvailableAnggota,
  getAvailablePembimbing,
} from "../api/proposal";
import {
  MahasiswaProposal,
  EligibilityCheck,
  AvailablePKM,
  AvailableAnggota,
  AvailablePembimbing,
  CreateProposalData,
  UpdateProposalData,
  MahasiswaProposalListParams,
} from "../types/api.types";

export const useProposal = () => {
  const [proposals, setProposals] = useState<MahasiswaProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = async (params?: MahasiswaProposalListParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMyProposals(params);
      if (response.success && response.data) {
        setProposals(response.data);
      } else {
        setError(response.message || "Failed to fetch proposals");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchProposalDetail = async (id: number) => {
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

  const submitProposal = async (data: CreateProposalData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createProposal(data);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true, data: response.data };
      } else {
        setError(response.message || "Failed to submit proposal");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const editProposal = async (id: number, data: UpdateProposalData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateProposal(id, data);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true, data: response.data };
      } else {
        setError(response.message || "Failed to update proposal");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeProposal = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteProposal(id);
      if (response.success) {
        await fetchProposals(); // Refresh the list
        return { success: true };
      } else {
        setError(response.message || "Failed to delete proposal");
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
    fetchProposals,
    fetchProposalDetail,
    submitProposal,
    editProposal,
    removeProposal,
  };
};

export const useEligibility = () => {
  const [eligibility, setEligibility] = useState<EligibilityCheck | null>(null);
  const [eligible, setEligible] = useState<boolean>(false);
  const [eligibleMessage, setEligibleMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEligibility = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkEligibility();
      if (response.success) {
        setEligibility(response.data || null);
        setEligible(response.eligible ?? false);
        setEligibleMessage(response.message ?? "");
        return response;
      } else {
        setError(response.message || "Failed to check eligibility");
        return response;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEligibility();
  }, []);

  return {
    eligibility,
    eligible,
    eligibleMessage,
    loading,
    error,
    fetchEligibility,
  };
};

export const useAvailablePKM = () => {
  const [pkms, setPkms] = useState<AvailablePKM[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPKMs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailablePKM();
      if (response.success && response.data) {
        setPkms(response.data);
      } else {
        setError(response.message || "Failed to fetch PKM types");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPKMs();
  }, []);

  return {
    pkms,
    loading,
    error,
    fetchPKMs,
  };
};

export const useAvailableAnggota = (search?: string) => {
  const [anggota, setAnggota] = useState<AvailableAnggota[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnggota = async (searchQuery?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailableAnggota(searchQuery);
      if (response.success && response.data) {
        setAnggota(response.data);
      } else {
        setError(response.message || "Failed to fetch anggota");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnggota(search);
  }, [search]);

  return {
    anggota,
    loading,
    error,
    fetchAnggota,
  };
};

export const useAvailablePembimbing = (search?: string) => {
  const [pembimbing, setPembimbing] = useState<AvailablePembimbing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPembimbing = async (searchQuery?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailablePembimbing(searchQuery);
      if (response.success && response.data) {
        setPembimbing(response.data);
      } else {
        setError(response.message || "Failed to fetch pembimbing");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPembimbing(search);
  }, [search]);

  return {
    pembimbing,
    loading,
    error,
    fetchPembimbing,
  };
};
