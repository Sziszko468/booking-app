"use client";

import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/services/auth";
import { LogOut, Bell, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard":        { title: "Dashboard",    description: "Overview & analytics" },
  "/appointments":     { title: "Appointments", description: "All scheduled bookings" },
  "/appointments/new": { title: "New Booking",  description: "Schedule an appointment" },
  "/clients":          { title: "Clients",      description: "Client management" },
};

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const router   = useRouter();
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const page = pageTitles[pathname] ?? { title: "BookingHub", description: "" };

  return (
    <header
      style={{
        height: "54px",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        flexShrink: 0,
      }}
    >
      {/* Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="menu-btn"
          style={{
            width: "32px", height: "32px", borderRadius: "8px",
            border: "1px solid var(--border)", background: "transparent",
            color: "var(--text-secondary)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.12s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          <Menu size={15} />
        </button>
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {page.title}
        </span>
        {page.description && (
          <>
            <span style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>/</span>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              {page.description}
            </span>
          </>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-card)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Bell */}
        <button
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.12s",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-card)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          <Bell size={14} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent)",
              border: "1.5px solid var(--bg-secondary)",
            }}
          />
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "20px",
            background: "var(--border)",
            margin: "0 4px",
          }}
        />

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderRadius: "7px",
            border: "1px solid transparent",
            background: "transparent",
            color: "var(--text-secondary)",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <LogOut size={13} />
          Logout
        </button>
      </div>
    </header>
  );
}
