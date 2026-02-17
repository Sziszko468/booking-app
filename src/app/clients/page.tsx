"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getClients } from "@/services/clientService";
import { Client } from "@/types/appointment";
import { Search, Users, Calendar, ChevronDown, ChevronUp, Mail, Clock } from "lucide-react";

const serviceColors: Record<string, string> = {
  "Consultation":    "#5b7cf6",
  "Follow-up":       "#a78bfa",
  "Treatment":       "#22c55e",
  "Check-up":        "#f59e0b",
  "Therapy Session": "#ec4899",
  "Assessment":      "#06b6d4",
};

function ClientRow({ client }: { client: Client }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const initials = client.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const color = serviceColors[client.topService ?? ""] ?? "#5b7cf6";

  return (
    <div
      style={{
        borderRadius: "10px",
        border: `1px solid ${expanded ? "var(--border-strong)" : "var(--border)"}`,
        background: expanded ? "var(--bg-card-hover)" : "var(--bg-card)",
        overflow: "hidden",
        transition: "all 0.15s",
      }}
    >
      {/* Main row */}
      <div
        onClick={() => setExpanded((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "13px 16px",
          cursor: "pointer",
          background: hovered && !expanded ? "var(--bg-card-hover)" : "transparent",
          transition: "background 0.12s",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
            border: `1px solid ${color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
            letterSpacing: "0.03em",
          }}
        >
          {initials}
        </div>

        {/* Name + email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
            {client.name}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Mail size={11} />
            {client.email}
          </div>
        </div>

        {/* Top service */}
        {client.topService && (
          <span
            style={{
              fontSize: "11px",
              padding: "3px 9px",
              borderRadius: "20px",
              background: `${color}14`,
              border: `1px solid ${color}28`,
              color,
              fontWeight: 500,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {client.topService}
          </span>
        )}

        {/* Stats */}
        <div style={{ display: "flex", gap: "20px", flexShrink: 0 }}>
          <div style={{ textAlign: "center" }}>
            <div className="stat-value" style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
              {client.totalAppointments}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px" }}>bookings</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", lineHeight: 1 }}>
              {client.lastAppointment
                ? new Date(client.lastAppointment).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "—"}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px" }}>last visit</div>
          </div>
        </div>

        {/* Expand icon */}
        <div style={{ color: "var(--text-tertiary)", flexShrink: 0, transition: "transform 0.15s", transform: expanded ? "rotate(0deg)" : "rotate(0deg)" }}>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </div>

      {/* Expanded: appointment history */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "10px 16px 14px",
          }}
        >
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
            Appointment history
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {client.appointments.map((appt) => {
              const c = serviceColors[appt.service] ?? "#5b7cf6";
              return (
                <div
                  key={appt.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: c,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, fontSize: "12px", color: "var(--text-primary)", fontWeight: 500 }}>
                    {appt.service}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-secondary)" }}>
                    <Calendar size={11} />
                    {new Date(appt.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                    <Clock size={11} />
                    {appt.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getClients().then(setClients).finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalBookings = clients.reduce((s, c) => s + c.totalAppointments, 0);

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
            <div style={{ width: "20px", height: "20px", border: "2px solid var(--border-strong)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Clients
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
                {clients.length} client{clients.length !== 1 ? "s" : ""} · {totalBookings} total booking{totalBookings !== 1 ? "s" : ""}
              </div>
            </div>
            <button className="btn-primary" onClick={() => router.push("/appointments/new")}>
              + New Booking
            </button>
          </div>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              { label: "Total clients", value: clients.length, icon: Users, color: "#5b7cf6" },
              { label: "Total bookings", value: totalBookings, icon: Calendar, color: "#a78bfa" },
              {
                label: "Avg. per client",
                value: clients.length ? (totalBookings / clients.length).toFixed(1) : "0",
                icon: Clock,
                color: "#22c55e",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="card"
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: `${color}14`,
                    border: `1px solid ${color}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} color={color} />
                </div>
                <div>
                  <div className="stat-value" style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "3px" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
            }}
          >
            <Search size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: "13px",
                color: "var(--text-primary)",
                caretColor: "var(--accent)",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "12px" }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Client list */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <Users size={32} style={{ color: "var(--text-tertiary)", margin: "0 auto 12px" }} />
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                {search ? "No clients found" : "No clients yet"}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                {search ? "Try a different search" : "Clients appear automatically when you create bookings"}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {filtered.map((client) => (
                <ClientRow key={client.email} client={client} />
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center" }}>
              {filtered.length} of {clients.length} clients
            </div>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}
