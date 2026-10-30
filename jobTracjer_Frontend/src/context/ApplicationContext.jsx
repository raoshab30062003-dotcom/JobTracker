import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import api from "../services/api";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert MySQL response fields into the format used by React.
  const normalizeApplication = (application) => ({
    id: String(application.id),
    company: application.company,
    position: application.position,
    location: application.location || "",
    jobType: application.job_type || "",
    status: application.status || "Applied",
    appliedDate: application.applied_date
      ? String(application.applied_date).slice(0, 10)
      : "",
    notes: application.notes || "",
  });

  // GET all applications from MySQL.
  const refreshApplications = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setApplications([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.get("/applications");

      const formattedApplications = response.data.data.map(
        normalizeApplication
      );

      setApplications(formattedApplications);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch applications."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch applications when authentication becomes available.
  useEffect(() => {
    const handleAuthChange = () => {
      refreshApplications().catch(() => {});
    };

    if (localStorage.getItem("token")) {
      handleAuthChange();
    }

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, [refreshApplications]);

  // CREATE application.
  const addApplication = async (application) => {
    setError("");

    try {
      const response = await api.post("/applications", application);

      const newApplication = {
        ...application,
        id: String(response.data.id),
      };

      setApplications((prev) => [newApplication, ...prev]);

      return newApplication;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create application."
      );

      throw error;
    }
  };

  // UPDATE application.
  const updateApplication = async (id, updatedData) => {
    setError("");

    try {
      await api.put(`/applications/${id}`, updatedData);

      setApplications((prev) =>
        prev.map((application) =>
          String(application.id) === String(id)
            ? { ...application, ...updatedData }
            : application
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update application."
      );

      throw error;
    }
  };

  // DELETE application.
  const deleteApplication = async (id) => {
    setError("");

    try {
      await api.delete(`/applications/${id}`);

      setApplications((prev) =>
        prev.filter(
          (application) => String(application.id) !== String(id)
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete application."
      );

      throw error;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        error,
        addApplication,
        updateApplication,
        deleteApplication,
        refreshApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  return useContext(ApplicationContext);
}