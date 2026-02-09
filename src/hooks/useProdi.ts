import { useState, useEffect } from "react";
import { getAllProdis, getProdisByFakultas } from "@/api/prodi";
import { Prodi } from "@/types/api.types";

/**
 * Custom hook to fetch all study programs for dropdown/filter usage
 */
export const useProdi = (fakultasId?: number) => {
  const [prodis, setProdis] = useState<Prodi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProdis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = fakultasId
        ? await getProdisByFakultas(fakultasId)
        : await getAllProdis();

      if (response.success && response.data) {
        setProdis(response.data);
      } else {
        setError(response.message || "Failed to fetch study programs");
      }
    } catch (err) {
      setError("An error occurred while fetching study programs");
      console.error("Error fetching prodis:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdis();
  }, [fakultasId]);

  return {
    prodis,
    loading,
    error,
    refetch: fetchProdis,
  };
};
