import {
  BriefcaseBusiness,
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isApplications = location.pathname.startsWith("/applications");
  const isAddApplication = location.pathname === "/applications/add";

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <BriefcaseBusiness size={22} />
        </div>

        <h1 className="text-xl font-bold">JobTracker</h1>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">
        <button
          onClick={() => navigate("/dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isDashboard
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/applications")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isApplications && !isAddApplication
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <FileText size={19} />
          <span>Applications</span>
        </button>

        <button
          onClick={() => navigate("/applications/add")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isAddApplication
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <PlusCircle size={19} />
          <span>Add Application</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="mt-auto px-4 pb-6">
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}