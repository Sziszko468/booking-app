"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointments } from "@/hooks/useAppointments";
import {
  User, Mail, Calendar, Clock, Briefcase,
  CheckCircle, AlertCircle, ArrowLeft,
} from "lucide-react";

const services = [
  "Consultation", "Follow-up", "Treatment",
  "Check-up", "Therapy Session", "Assessment",
];

export default function NewAppointmentPage() {
  const router = useRouter();
  const { createAppointment } = useAppointments();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const data = {
      name:    fd.get("name") as string,
      email:   fd.get("email") as string,
      date:    fd.get("date") as string,
      time:    fd.get("time") as string,
      service: fd.get("service") as string,
      status:  "scheduled" as const,
      notes:   "",
    };

    if (!data.name || !data.email || !data.date || !data.time || !data.service) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await createAppointment(data);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/appointments"), 1500);
    } else {
      setError(result.error || "Failed to create appointment");
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (success) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div style={{ maxWidth: "480px", textAlign: "center", margin: "60px auto 0" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <CheckCircle size={24} color="#4ade80" />
            </div>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
              Booking created!
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Redirecting to appointments…
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ maxWidth: "520px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <button
              onClick={() => router.back()}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
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
            >
              <ArrowLeft size={14} />
            </button>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                New Booking
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Schedule an appointment
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {[
                { label: "Client name", name: "name", type: "text", icon: User, placeholder: "Jane Doe" },
                { label: "Email address", name: "email", type: "email", icon: Mail, placeholder: "jane@example.com" },
              ].map(({ label, name, type, icon: Icon, placeholder }) => (
                <div key={name}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                    {label}
                  </label>
                  <div style={{ position: "relative" }}>
                    <Icon size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                    <input
                      name={name}
                      type={type}
                      required
                      className="input-field"
                      style={{ paddingLeft: "34px" }}
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}

              {/* Date + Time row */}
              <div className="date-time-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <Calendar size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                    <input
                      name="date"
                      type="date"
                      required
                      min={today}
                      className="input-field"
                      style={{ paddingLeft: "34px" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Time
                  </label>
                  <div style={{ position: "relative" }}>
                    <Clock size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                    <input
                      name="time"
                      type="time"
                      required
                      className="input-field"
                      style={{ paddingLeft: "34px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Service */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Service type
                </label>
                <div style={{ position: "relative" }}>
                  <Briefcase size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                  <select
                    name="service"
                    required
                    className="input-field"
                    style={{ paddingLeft: "34px" }}
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", fontSize: "12px", color: "#f87171" }}>
                  <AlertCircle size={13} />
                  {error}
                </div>
              )}

              {/* Divider */}
              <div className="divider" />

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  {loading ? (
                    <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  ) : "Create Booking"}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}