"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Plus, Settings, Users, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links: NavLink[] = [
    { href: "/dashboard",        label: t("nav.dashboard"),    icon: <LayoutDashboard size={16} /> },
    { href: "/appointments",     label: t("nav.appointments"), icon: <Calendar size={16} /> },
    { href: "/calendar",         label: t("nav.calendar"),     icon: <Calendar size={16} /> },
    { href: "/appointments/new", label: t("nav.newBooking"),   icon: <Plus size={16} /> },
    { href: "/clients",          label: t("nav.clients"),      icon: <Users size={16} /> },
    { href: "/settings/email",   label: t("nav.settings"),     icon: <Settings size={16} /> },
  ];

  return (
    <aside style={{
      width: "220px", minWidth: "220px",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", background: "var(--accent)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Calendar size={14} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>BookingHub</div>
            <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>Admin</div>
          </div>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: "4px", borderRadius: "6px" }}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {links.map((link) => {
          const isActive = link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "7px 10px", borderRadius: "7px",
                fontSize: "13px", fontWeight: 500,
                transition: "all 0.12s", textDecoration: "none",
                background: isActive ? "rgba(91,124,246,0.12)" : "transparent",
                color: isActive ? "#7b9af8" : "var(--text-secondary)",
                border: isActive ? "1px solid rgba(91,124,246,0.2)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.color = "var(--text-primary)"; } }}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; } }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7 }}>{link.icon}</span>
              <span style={{ flex: 1 }}>{link.label}</span>
              {link.badge && (
                <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "4px", background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-tertiary)", fontWeight: 500 }}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px", borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, color: "#fff", flexShrink: 0 }}>
            A
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>Admin</div>
            <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>admin@test.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
