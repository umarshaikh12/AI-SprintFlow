import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FolderKanban size={20} />,
      title: "Projects",
      path: "/projects",
    },
    {
      icon: <CheckSquare size={20} />,
      title: "Tasks",
      path: "/tasks",
    },
    {
      icon: <Sparkles size={20} />,
      title: "AI Assistant",
      path: "/ai",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
      path: "/settings",
    },
  ];

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          AI
          <span className="text-violet-500">SprintFlow</span>
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Agile Project Management
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-6">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 rounded-xl px-4 py-3 mb-2 transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-violet-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            {item.title}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 rounded-xl px-4 py-4 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;