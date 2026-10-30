
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Pencil, Trash2 } from "lucide-react";
import Layout from "../layouts/Layout";
import { useApplications } from "../context/ApplicationContext";

function StatusBadge({ status }) {
  const styles = {
    Applied: "bg-green-100 text-green-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Selected: "bg-purple-100 text-purple-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function Applications() {
  const navigate = useNavigate();

  const { applications, deleteApplication } = useApplications();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.position.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (confirmDelete) {
      deleteApplication(id);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          All Applications
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your job applications
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Status</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Company
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Position
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Location
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {application.company}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {application.position}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {application.location || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={application.status} />
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {application.appliedDate || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/applications/edit/${application.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(application.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t text-sm text-gray-500">
          Showing {filteredApplications.length} of{" "}
          {applications.length} applications
        </div>
      </div>
    </Layout>
  );
}
