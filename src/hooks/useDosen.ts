import { useState } from "react";
import {
  getDosenList,
  getDosenDetail,
  updateDosenQuota,
  resetDosenQuota,
  deleteDosen,
} from "../api/dosen";
import {
  Dosen,
  DosenListParams,
  UpdateDosenQuotaData,
} from "../types/api.types";

export const useDosen = () => {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null>(null);

  const fetchDosen = async (params?: DosenListParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDosenList(params);
      if (response.success && response.data) {
        setDosenList(response.data);
        setMeta(response.meta || null);
      } else {
        setError(response.message || "Failed to fetch dosen list");
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
      const response = await getDosenDetail(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || "Failed to fetch dosen detail");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateQuota = async (id: number, data: UpdateDosenQuotaData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateDosenQuota(id, data);
      if (response.success) {
        await fetchDosen(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to update quota");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resetQuota = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetDosenQuota(id);
      if (response.success) {
        await fetchDosen(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to reset quota");
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeDosen = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteDosen(id);
      if (response.success) {
        await fetchDosen(); // Refresh the list
        return { success: true, message: response.message };
      } else {
        setError(response.message || "Failed to delete dosen");
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
    dosenList,
    loading,
    error,
    meta,
    fetchDosen,
    fetchDetail,
    updateQuota,
    resetQuota,
    removeDosen,
  };
};
