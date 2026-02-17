"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(2px)",
            zIndex: 40,
            display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar — hidden on mobile */}
      <div className="sidebar-wrapper" style={{ flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <div
        className="sidebar-drawer"
        style={{
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          width: "240px",
          zIndex: 50,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main style={{ flex: 1, padding: "20px 16px", overflowY: "auto", paddingBottom: "80px" }} className="main-content">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <BottomNav />

      <style>{`
        @media (min-width: 768px) {
          .sidebar-wrapper  { display: flex !important; }
          .sidebar-drawer   { display: none !important; }
          .mobile-overlay   { display: none !important; }
          .bottom-nav       { display: none !important; }
          .main-content     { padding: 24px 28px !important; padding-bottom: 24px !important; }
          .menu-btn         { display: none !important; }
        }
        @media (max-width: 767px) {
          .sidebar-wrapper  { display: none !important; }
        }
      `}</style>
    </div>
  );
}
