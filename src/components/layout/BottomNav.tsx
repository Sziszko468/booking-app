"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Plus, Users } from "lucide-react";

const links = [
  { href: "/dashboard",        label: "Home",      icon: LayoutDashboard },
  { href: "/appointments",     label: "Bookings",  icon: Calendar },
  { href: "/appointments/new", label: "New",       icon: Plus, primary: true },
  { href: "/clients",          label: "Clients",   icon: Users },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        height: "64px",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px",
        zIndex: 30,
        backdropFilter: "blur(12px)",
      }}
    >
      {links.map(({ href, label, icon: Icon, primary }) => {
        const isActive = href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname.startsWith(href) && !(href === "/appointments" && pathname === "/appointments/new");

        if (primary) {
          return (
            <Link
              key={href}
              href={href}
              style={{
                width: "48px", height: "48px",
                borderRadius: "14px",
                background: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(91,124,246,0.4)",
                flexShrink: 0,
              }}
            >
              <Icon size={20} color="#fff" />
            </Link>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "3px", padding: "6px 0",
              textDecoration: "none",
              color: isActive ? "var(--accent)" : "var(--text-tertiary)",
              transition: "color 0.12s",
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            <span style={{ fontSize: "10px", fontWeight: isActive ? 600 : 400, letterSpacing: "0.01em" }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
