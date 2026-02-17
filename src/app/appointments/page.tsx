"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointments } from "@/hooks/useAppointments";
import { Trash2, Calendar, Plus, Search, Filter } from "lucide-react";
import { Appointment } from "@/types/appointment";

const serviceColors: Record<string, string> = {
  "Consultation":     "#5b7cf6",
  "Follow-up":        "#a78bfa",
  "Treatment":        "#22c55e",
  "Check-up":         "#f59e0b",
  "Therapy Session":  "#ec4899",
  "Assessment":       "#06b6d4",
};

function AppointmentCard({
  appointment,
  onDelete,
}: {
  appointment: Appointment;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const initials = appointment.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const color = serviceColors[appointment.service] ?? "#5b7cf6";
  const date = new Date(appointment.date);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Delete this appointment?")) return;
    setDeleting(true);
    onDelete();
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 16px",
        borderRadius: "10px",
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border)"}`,
        transition: "all 0.12s",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        opacity: deleting ? 0.4 : 1,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "9px",
          background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
          border: `1px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
          flexShrink: 0,
          letterSpacing: "0.02em",
        }}
      >
        {initials}
      </div>

      {/* Name + email */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {appointment.name}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            marginTop: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {appointment.email}
        </div>
      </div>

      {/* Date */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
          padding: "6px 10px",
          borderRadius: "8px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          flexShrink: 0,
          minWidth: "64px",
        }}
      >
        <span style={{ fontSize: "10px", color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {date.toLocaleDateString("en-US", { month: "short" })}
        </span>
        <span
          className="stat-value"
          style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}
        >
          {date.getDate()}
        </span>
        <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>
          {appointment.time}
        </span>
      </div>

      {/* Service badge */}
      <span
        style={{
          fontSize: "11px",
          padding: "3px 10px",
          borderRadius: "20px",
          background: `${color}14`,
          border: `1px solid ${color}28`,
          color: color,
          fontWeight: 500,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {appointment.service}
      </span>

      {/* Delete */}
      <button
        onClick={handleDelete}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "7px",
          border: "1px solid transparent",
          background: "transparent",
          color: "var(--text-tertiary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.12s",
          flexShrink: 0,
          opacity: hovered ? 1 : 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(239,68,68,0.08)";
          e.currentTarget.style.color = "#f87171";
          e.currentTarget.style.borderColor = "rgba(239,68,68,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text-tertiary)";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { appointments, loading, deleteAppointment } = useAppointments();
  const [search, setSearch] = useState("");

  const filtered = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
            <div style={{
              width: "20px", height: "20px",
              border: "2px solid var(--border-strong)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ maxWidth: "900px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Appointments
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
                {appointments.length} total booking{appointments.length !== 1 ? "s" : ""}
              </div>
            </div>
            <button className="btn-primary" onClick={() => router.push("/appointments/new")}>
              <Plus size={14} />
              New Booking
            </button>
          </div>

          {/* Search + filter bar */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "6px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
            }}
          >
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", padding: "0 8px" }}>
              <Search size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or service…"
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
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-tertiary)",
                    cursor: "pointer",
                    fontSize: "12px",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            <button className="btn-ghost">
              <Filter size={13} />
              Filter
            </button>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "var(--bg-card)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              <Calendar size={32} style={{ color: "var(--text-tertiary)", margin: "0 auto 12px" }} />
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                {search ? "No results found" : "No appointments yet"}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "20px" }}>
                {search ? `Try a different search term` : "Create your first booking to get started"}
              </div>
              {!search && (
                <button className="btn-primary" onClick={() => router.push("/appointments/new")}>
                  <Plus size={14} />
                  New Booking
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {filtered.map((appt) => (
                <AppointmentCard
                  key={appt.id}
                  appointment={appt}
                  onDelete={() => deleteAppointment(appt.id)}
                />
              ))}
            </div>
          )}

          {/* Footer count */}
          {filtered.length > 0 && (
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center", paddingTop: "4px" }}>
              Showing {filtered.length} of {appointments.length} appointments
            </div>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}
