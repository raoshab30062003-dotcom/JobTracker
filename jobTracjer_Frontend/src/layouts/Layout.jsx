import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-8 min-w-0">
        {children}
      </main>
    </div>
  );
}