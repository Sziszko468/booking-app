"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Plus
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();

  const links: NavLink[] = [
    { 
      href: "/dashboard", 
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />
    },
    { 
      href: "/appointments", 
      label: "Appointments",
      icon: <Calendar size={20} />
    },
    { 
      href: "/appointments/new", 
      label: "New Booking",
      icon: <Plus size={20} />
    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          BookingHub
        </h2>
        <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          v1.0.0 • Made with ❤️
        </div>
      </div>
    </aside>
  );
}
