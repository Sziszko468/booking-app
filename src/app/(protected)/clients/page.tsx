"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { getClients } from "@/services/clientService";
import { Client, Appointment } from "@/types/appointment";
import { useAppointments } from "@/hooks/useAppointments";
import EditAppointmentModal from "@/components/appointments/EditAppointmentModal";
import {
  Search, Users, Calendar, ChevronDown, ChevronUp,
  Mail, Clock, Pencil, CheckCircle, XCircle,
} from "lucide-react";

const serviceColors: Record<string, string> = {
  "Consultation":    "#5b7cf6",
  "Follow-up":       "#a78bfa",
  "Treatment":       "#22c55e",
  "Check-up":        "#f59e0b",
  "Therapy Session": "#ec4899",
  "Assessment":      "#06b6d4",
};

const statusConfig = {
  scheduled: { label: "Scheduled", color: "#5b7cf6", icon: Clock },
  completed:  { label: "Completed", color: "#22c55e", icon: CheckCircle },
  cancelled:  { label: "Cancelled", color: "#ef4444", icon: XCircle },
};

function ClientRow({ client, onEdit }: { client: Client; onEdit: (a: Appointment) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const initials = client.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const color    = serviceColors[client.topService ?? ""] ?? "#5b7cf6";

  return (
    <div style={{
      borderRadius: "10px",
      border: `1px solid ${expanded ? "var(--border-strong)" : "var(--border)"}`,
      background: expanded ? "var(--bg-card-hover)" : "var(--bg-card)",
      overflow: "hidden",
      transition: "all 0.15s",
    }}>
      {/* Header row */}
      <div
        onClick={() => setExpanded((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: "14px",
          padding: "13px 16px", cursor: "pointer",
          background: hovered && !expanded ? "var(--bg-card-hover)" : "transparent",
          transition: "background 0.12s",
        }}
      >
        {/* Avatar */}
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
          border: `1px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 700, color: "#fff", letterSpacing: "0.03em",
        }}>
          {initials}
        </div>

        {/* Name + email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
            {client.name}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Mail size={11} />{client.email}
          </div>
        </div>

        {/* Top service badge */}
        {client.topService && (
          <span style={{
            fontSize: "11px", padding: "3px 9px", borderRadius: "20px",
            background: `${color}14`, border: `1px solid ${color}28`,
            color, fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
          }}>
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

        <div style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </div>

      {/* Expanded history */}
      {expanded && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px 14px" }}>
          <div style={{
            fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px",
          }}>
            Appointment history
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {client.appointments.map((appt) => {
              const c  = serviceColors[appt.service] ?? "#5b7cf6";
              const st = statusConfig[appt.status ?? "scheduled"];
              const StIcon = st.icon;
              return (
                <div key={appt.id} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 12px", borderRadius: "8px",
                  background: "var(--bg-secondary)", border: "1px solid var(--border)",
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0 }} />

                  <div style={{ flex: 1, fontSize: "12px", color: "var(--text-primary)", fontWeight: 500 }}>
                    {appt.service}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <StIcon size={11} color={st.color} />
                    <span style={{ fontSize: "11px", color: st.color, fontWeight: 500 }}>{st.label}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-secondary)" }}>
                    <Calendar size={11} />
                    {new Date(appt.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                    <Clock size={11} />{appt.time}
                  </div>

                  {appt.notes && (
                    <div style={{
                      fontSize: "11px", color: "var(--text-tertiary)", fontStyle: "italic",
                      maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      &ldquo;{appt.notes}&rdquo;
                    </div>
                  )}

                  <button
                    onClick={() => onEdit(appt)}
                    style={{
                      width: "26px", height: "26px", borderRadius: "6px",
                      border: "1px solid var(--border)", background: "transparent",
                      color: "var(--text-tertiary)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(91,124,246,0.08)";
                      e.currentTarget.style.color = "#7b9af8";
                      e.currentTarget.style.borderColor = "rgba(91,124,246,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-tertiary)";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <Pencil size={11} />
                  </button>
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
  const [clients, setClients]       = useState<Client[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [editTarget, setEditTarget] = useState<Appointment | null>(null);
  const { updateAppointment }       = useAppointments();

  useEffect(() => {
    let mounted = true;
    getClients().then((data) => {
      if (mounted) {
        setClients(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleSave = async (id: string, data: Partial<Appointment>) => {
    await updateAppointment(id, data);
    setEditTarget((prev) => (prev ? { ...prev, ...data } : null));
    getClients().then(setClients);
  };

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
          <div className="summary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              { label: "Total clients",   value: clients.length },
              { label: "Total bookings",  value: totalBookings },
              { label: "Avg. per client", value: clients.length ? (totalBookings / clients.length).toFixed(1) : "0" },
            ].map(({ label, value }, i) => {
              const colors = ["#5b7cf6", "#a78bfa", "#22c55e"];
              return (
                <div key={label} className="card" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div className="stat-value" style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{label}</div>
                  <div style={{ height: "2px", borderRadius: "1px", background: colors[i], width: "24px", marginTop: "2px" }} />
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "6px 12px", background: "var(--bg-card)",
            border: "1px solid var(--border)", borderRadius: "10px",
          }}>
            <Search size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "13px", color: "var(--text-primary)", caretColor: "var(--accent)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "12px" }}>
                ✕
              </button>
            )}
          </div>

          {/* List */}
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
                <ClientRow key={client.email} client={client} onEdit={setEditTarget} />
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center" }}>
              {filtered.length} of {clients.length} clients
            </div>
          )}
        </div>

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