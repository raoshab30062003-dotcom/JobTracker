
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../services/api";
import {
  FileCheck,
  Clock3,
  Star,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";

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

function StatCard({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div className={`p-3 rounded-xl ${bgColor}`}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  
useEffect(() => {
  const testConnection = async () => {
    try {
      const response = await api.get("/health");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  testConnection();
}, []);

  const { applications, deleteApplication } = useApplications();

  // Calculate application statistics.
  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // Display the five most recently added applications.
  const recentApplications = [...applications]
    .reverse()
    .slice(0, 5);

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Rohit!
        </h1>

        <p className="text-gray-500 mt-1">
          Track your job applications and achieve your goals.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={FileCheck}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Applied"
          value={appliedCount}
          icon={FileCheck}
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />

        <StatCard
          title="Interview"
          value={interviewCount}
          icon={Clock3}
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />

        <StatCard
          title="Selected"
          value={selectedCount}
          icon={Star}
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Rejected"
          value={rejectedCount}
          icon={XCircle}
          bgColor="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Applications
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest job applications
            </p>
          </div>

          <button
            onClick={() => navigate("/applications")}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View All
          </button>
        </div>

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
              {recentApplications.length > 0 ? (
                recentApplications.map((application) => (
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
                            navigate(
                              `/applications/edit/${application.id}`
                            )
                          }
                          title="Edit application"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(application.id)
                          }
                          title="Delete application"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No applications found. Add your first application!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
