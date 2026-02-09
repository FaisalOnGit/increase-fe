import { useState, useEffect } from "react";
import { getAllFaculties } from "@/api/faculty";
import { Faculty } from "@/types/api.types";

/**
 * Custom hook to fetch all faculties for dropdown/filter usage
 */
export const useFaculty = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaculties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllFaculties();
      if (response.success && response.data) {
        setFaculties(response.data);
      } else {
        setError(response.message || "Failed to fetch faculties");
      }
    } catch (err) {
      setError("An error occurred while fetching faculties");
      console.error("Error fetching faculties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return {
    faculties,
    loading,
    error,
    refetch: fetchFaculties,
  };
};
