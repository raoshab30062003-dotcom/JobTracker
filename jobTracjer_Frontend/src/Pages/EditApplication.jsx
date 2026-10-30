
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import Layout from "../layouts/Layout";
import { useApplications } from "../context/ApplicationContext";

export default function EditApplication() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { applications, updateApplication } = useApplications();

  // Find the selected application using its ID.
  const existingApplication = applications.find(
    (application) => application.id === id
  );

  const [formData, setFormData] = useState(null);

  // Load application details into the form.
  useEffect(() => {
    if (existingApplication) {
      setFormData({ ...existingApplication });
    }
  }, [existingApplication]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateApplication(id, formData);

    alert("Application updated successfully!");

    navigate("/applications");
  };

  const handleReset = () => {
    if (existingApplication) {
      setFormData({ ...existingApplication });
    }
  };

  if (!existingApplication || !formData) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800">
            Application Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            The application you are trying to edit does not exist.
          </p>

          <button
            onClick={() => navigate("/applications")}
            className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Applications
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <button
          onClick={() => navigate("/applications")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Applications
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Edit Application
        </h1>

        <p className="text-gray-500 mt-1">
          Update your job application details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Position *
            </label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applied Date
            </label>

            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw size={17} />
            Reset Changes
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={17} />
            Update Application
          </button>
        </div>
      </form>
    </Layout>
  );
}
