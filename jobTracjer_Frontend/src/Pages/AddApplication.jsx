
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import Layout from "../layouts/Layout";
import { useApplications } from "../context/ApplicationContext";

const initialFormData = {
  company: "",
  position: "",
  location: "",
  jobType: "Full-time",
  status: "Applied",
  appliedDate: "",
  notes: "",
};

export default function AddApplication() {
  const navigate = useNavigate();
  const { addApplication } = useApplications();

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addApplication(formData);

    alert("Application added successfully!");

    setFormData(initialFormData);
    navigate("/applications");
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

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
          Add New Application
        </h1>
        <p className="text-gray-500 mt-1">
          Enter the details of your job application
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
              placeholder="e.g. Google"
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
              placeholder="e.g. Frontend Developer"
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
              placeholder="e.g. Bengaluru"
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
              value={formData.appliedDate}
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
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Add interview details or other notes..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw size={17} />
            Clear Form
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={17} />
            Save Application
          </button>
        </div>
      </form>
    </Layout>
  );
}
