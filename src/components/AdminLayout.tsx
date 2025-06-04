import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  BarChart,
  Layers,
  FileQuestion,
  Home,
  Menu,
  X,
} from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Layers, label: "Levels", href: "/admin/levels" },
    { icon: FileQuestion, label: "Quizzes", href: "/admin/quizzes" },
    { icon: BarChart, label: "Skills", href: "/admin/skills" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar - mobile (overlay) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar - actual content */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r pt-5 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-4 py-2 mb-6">
          <Link to="/admin" className="flex items-center">
            <span className="text-3xl font-bold text-[#5300B3]">ZAT </span>
            <span className="ml-2 text-3xl bg-[#5300B3] text-white px-2 py-0.5 rounded">
              Admin
            </span>
          </Link>
        </div>

        <nav className="px-2">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-base font-semibold rounded-md hover:bg-[#ac6af7] hover:text-white
                    ${
                      location.pathname === item.href
                        ? "bg-[#5300B3] text-white"
                        : ""
                    }
                  `}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Main Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className={`lg:ml-64 min-h-screen p-6`}>
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
