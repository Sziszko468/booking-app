"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-xs text-gray-500">Manage your appointments</p>
      </div>

      <div className="flex items-center gap-4">
        {/* User info */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-700">Admin User</div>
            <div className="text-xs text-gray-500">admin@test.com</div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOut size={16} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
