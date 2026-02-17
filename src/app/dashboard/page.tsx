"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointmentStats } from "@/hooks/useAppointments";
import * as appointmentService from "@/services/appointmentApi";
import { Appointment } from "@/types/appointment";
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ChevronRight,
} from "lucide-react";

function StatCard({
  label,
  value,
  delta,
  positive = true,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  delta: string;
  positive?: boolean;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
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
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            padding: "2px 7px",
            borderRadius: "20px",
            background: positive ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${positive ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)"}`,
            color: positive ? "#4ade80" : "#f87171",
          }}
        >
          {delta}
        </span>
      </div>
      <div>
        <div
          className="stat-value"
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            marginTop: "5px",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function AppointmentRow({ appointment, onClick }: { appointment: Appointment; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const initials = appointment.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.12s",
        background: hovered ? "var(--bg-card-hover)" : "transparent",
        border: `1px solid ${hovered ? "var(--border-strong)" : "transparent"}`,
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, var(--accent), #a78bfa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 600,
          color: "#fff",
          flexShrink: 0,
          letterSpacing: "0.02em",
        }}
      >
        {initials}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {appointment.name}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "1px" }}>
          {appointment.email}
        </div>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-secondary)" }}>
          {new Date(appointment.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "1px" }}>
          {appointment.time}
        </div>
      </div>

      <span
        style={{
          fontSize: "11px",
          padding: "2px 8px",
          borderRadius: "5px",
          background: "rgba(91,124,246,0.1)",
          border: "1px solid rgba(91,124,246,0.2)",
          color: "#7b9af8",
          fontWeight: 500,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {appointment.service}
      </span>

      <ChevronRight
        size={14}
        style={{
          color: "var(--text-tertiary)",
          transition: "transform 0.12s",
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { stats, loading: statsLoading } = useAppointmentStats();
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentService.getUpcomingAppointments(6).then(setUpcoming).finally(() => setLoading(false));
  }, []);

  if (loading || statsLoading) {
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
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const topService = stats.topServices[0];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1100px" }}>

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Good day 👋
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </div>
            </div>
            <button
              className="btn-primary"
              onClick={() => router.push("/appointments/new")}
            >
              <Plus size={14} />
              New Booking
            </button>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            <StatCard label="Total bookings" value={stats.total} delta="+12%" icon={Calendar} color="#5b7cf6" />
            <StatCard label="Today" value={stats.today} delta={`+${stats.today}`} icon={Clock} color="#a78bfa" />
            <StatCard label="This week" value={stats.thisWeek} delta="+8%" icon={TrendingUp} color="#22c55e" />
            <StatCard label="Unique clients" value={stats.uniqueClients} delta="+5" icon={Users} color="#f59e0b" />
          </div>

          {/* Main content */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "12px", alignItems: "start" }}>

            {/* Upcoming appointments */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{
                padding: "14px 16px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Upcoming appointments</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "1px" }}>{upcoming.length} scheduled</div>
                </div>
                <button
                  onClick={() => router.push("/appointments")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-glow)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  View all <ArrowUpRight size={12} />
                </button>
              </div>

              <div style={{ padding: "6px 8px" }}>
                {upcoming.length === 0 ? (
                  <div style={{ padding: "40px 20px", textAlign: "center" }}>
                    <Calendar size={28} style={{ color: "var(--text-tertiary)", margin: "0 auto 10px" }} />
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>No upcoming appointments</div>
                    <button
                      className="btn-primary"
                      style={{ marginTop: "14px" }}
                      onClick={() => router.push("/appointments/new")}
                    >
                      <Plus size={13} /> Create one
                    </button>
                  </div>
                ) : (
                  upcoming.map((appt) => (
                    <AppointmentRow
                      key={appt.id}
                      appointment={appt}
                      onClick={() => router.push("/appointments")}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

              {/* Top services */}
              <div className="card">
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "14px" }}>
                  Service breakdown
                </div>
                {stats.topServices.length === 0 ? (
                  <div style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center", padding: "16px 0" }}>
                    No data yet
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {stats.topServices.map(([service, count], i) => {
                      const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                      const colors = ["#5b7cf6", "#a78bfa", "#22c55e"];
                      return (
                        <div key={service}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                              {service}
                            </span>
                            <span className="stat-value" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                              {pct}%
                            </span>
                          </div>
                          <div style={{ height: "3px", background: "var(--bg-secondary)", borderRadius: "2px", overflow: "hidden" }}>
                            <div
                              style={{
                                height: "100%",
                                width: `${pct}%`,
                                background: colors[i],
                                borderRadius: "2px",
                                transition: "width 0.6s ease",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Today summary */}
              <div
                className="card"
                style={{
                  background: "linear-gradient(135deg, rgba(91,124,246,0.08) 0%, rgba(167,139,250,0.08) 100%)",
                  borderColor: "rgba(91,124,246,0.2)",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "14px" }}>
                  Today&apos;s summary
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { label: "Scheduled", value: stats.today, color: "#5b7cf6" },
                    { label: "Completed", value: Math.floor(stats.today * 0.7), color: "#22c55e" },
                    { label: "Pending", value: Math.ceil(stats.today * 0.3), color: "#f59e0b" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        borderRadius: "7px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{item.label}</span>
                      </div>
                      <span className="stat-value" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top service badge */}
              {topService && (
                <div
                  className="card"
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(245,158,11,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TrendingUp size={15} color="#f59e0b" />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>Top service</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginTop: "1px" }}>
                      {topService[0]}
                    </div>
                  </div>
                  <span className="stat-value" style={{ marginLeft: "auto", fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    {topService[1]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}
