"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointments } from "@/hooks/useAppointments";
import EditAppointmentModal from "../../components/appointments/EditAppointmentModal";
import { Appointment } from "@/types/appointment";
import { Trash2, Calendar, Plus, Search, Pencil, CheckCircle, Clock, XCircle } from "lucide-react";

const serviceColors: Record<string, string> = {
  "Consultation":    "#5b7cf6",
  "Follow-up":       "#a78bfa",
  "Treatment":       "#22c55e",
  "Check-up":        "#f59e0b",
  "Therapy Session": "#ec4899",
  "Assessment":      "#06b6d4",
};

const statusConfig = {
  scheduled:  { label: "Scheduled",  icon: Clock,        color: "#5b7cf6" },
  completed:  { label: "Completed",  icon: CheckCircle,  color: "#22c55e" },
  cancelled:  { label: "Cancelled",  icon: XCircle,      color: "#ef4444" },
};

function AppointmentCard({
  appointment,
  onDelete,
  onEdit,
}: {
  appointment: Appointment;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const initials = appointment.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const color = serviceColors[appointment.service] ?? "#5b7cf6";
  const date = new Date(appointment.date);
  const status = statusConfig[appointment.status ?? "scheduled"];
  const StatusIcon = status.icon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Delete this appointment?")) return;
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
      }}
    >
      {/* Avatar */}
      <div style={{
        width: "38px", height: "38px", borderRadius: "9px", flexShrink: 0,
        background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
        border: `1px solid ${color}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: "0.02em",
      }}>
        {initials}
      </div>

      {/* Name + email */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {appointment.name}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {appointment.email}
        </div>
        {appointment.notes && (
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontStyle: "italic" }}>
            `&quot;`{appointment.notes}`&quot;`
          </div>
        )}
      </div>

      {/* Date tile */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "6px 10px", borderRadius: "8px",
        background: "var(--bg-secondary)", border: "1px solid var(--border)",
        flexShrink: 0, minWidth: "58px",
      }}>
        <span style={{ fontSize: "10px", color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {date.toLocaleDateString("en-US", { month: "short" })}
        </span>
        <span className="stat-value" style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}>
          {date.getDate()}
        </span>
        <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>
          {appointment.time}
        </span>
      </div>

      {/* Service */}
      <span style={{
        fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
        background: `${color}14`, border: `1px solid ${color}28`, color,
        fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {appointment.service}
      </span>

      {/* Status */}
      <div className="hide-mobile" style={{
        display: "flex", alignItems: "center", gap: "5px",
        padding: "3px 9px", borderRadius: "20px",
        background: `${status.color}10`,
        border: `1px solid ${status.color}28`,
        flexShrink: 0,
      }}>
        <StatusIcon size={11} color={status.color} />
        <span style={{ fontSize: "11px", fontWeight: 500, color: status.color }}>{status.label}</span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "4px", flexShrink: 0, opacity: hovered ? 1 : 0, transition: "opacity 0.12s" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          style={{
            width: "30px", height: "30px", borderRadius: "7px",
            border: "1px solid var(--border)", background: "transparent",
            color: "var(--text-secondary)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.12s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,124,246,0.08)"; e.currentTarget.style.color = "#7b9af8"; e.currentTarget.style.borderColor = "rgba(91,124,246,0.2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <Pencil size={12} />
        </button>
        <button
          onClick={handleDelete}
          style={{
            width: "30px", height: "30px", borderRadius: "7px",
            border: "1px solid transparent", background: "transparent",
            color: "var(--text-tertiary)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.12s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.borderColor = "transparent"; }}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { appointments, loading, deleteAppointment, updateAppointment } = useAppointments();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editTarget, setEditTarget] = useState<Appointment | null>(null);

  const filtered = appointments
    .filter((a) => filterStatus === "all" || a.status === filterStatus)
    .filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase())
    );

  const handleSave = async (id: string, data: Partial<Appointment>) => {
    await updateAppointment(id, data);
    setEditTarget((prev) => prev ? { ...prev, ...data } : null);
  };

  if (loading) {
    return (
      <ProtectedRoute><AdminLayout>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
          <div style={{ width: "20px", height: "20px", border: "2px solid var(--border-strong)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </AdminLayout></ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ maxWidth: "900px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Appointments</div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
                {appointments.length} total booking{appointments.length !== 1 ? "s" : ""}
              </div>
            </div>
            <button className="btn-primary" onClick={() => router.push("/appointments/new")}>
              <Plus size={14} /> New Booking
            </button>
          </div>

          {/* Search + filter bar */}
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{
              flex: 1, display: "flex", alignItems: "center", gap: "8px",
              padding: "6px 12px", background: "var(--bg-card)",
              border: "1px solid var(--border)", borderRadius: "10px",
            }}>
              <Search size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or service…"
                style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "13px", color: "var(--text-primary)", caretColor: "var(--accent)" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "12px" }}>✕</button>
              )}
            </div>

            {/* Status filter */}
            <div style={{ display: "flex", gap: "4px", padding: "4px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              {[
                { value: "all",       label: "All" },
                { value: "scheduled", label: "Scheduled" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilterStatus(opt.value)}
                  style={{
                    padding: "4px 12px", borderRadius: "7px",
                    border: "1px solid transparent",
                    background: filterStatus === opt.value ? "var(--bg-secondary)" : "transparent",
                    borderColor: filterStatus === opt.value ? "var(--border-strong)" : "transparent",
                    color: filterStatus === opt.value ? "var(--text-primary)" : "var(--text-secondary)",
                    fontSize: "12px", fontWeight: 500, cursor: "pointer", transition: "all 0.12s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <Calendar size={32} style={{ color: "var(--text-tertiary)", margin: "0 auto 12px" }} />
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                {search || filterStatus !== "all" ? "No results found" : "No appointments yet"}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "20px" }}>
                {search || filterStatus !== "all" ? "Try adjusting your filters" : "Create your first booking to get started"}
              </div>
              {!search && filterStatus === "all" && (
                <button className="btn-primary" onClick={() => router.push("/appointments/new")}>
                  <Plus size={14} /> New Booking
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
                  onEdit={() => setEditTarget(appt)}
                />
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center" }}>
              Showing {filtered.length} of {appointments.length} appointments
            </div>
          )}
        </div>

        {/* Edit modal */}
        <EditAppointmentModal
          appointment={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}
