"use client";

import { useState, useEffect, useRef } from "react";
import { Appointment } from "@/types/appointment";
import { X, Calendar, Clock, Briefcase, FileText, CheckCircle, AlertCircle } from "lucide-react";

const services = [
  "Consultation", "Follow-up", "Treatment",
  "Check-up", "Therapy Session", "Assessment",
];

const statusOptions: { value: Appointment["status"]; label: string; color: string }[] = [
  { value: "scheduled",  label: "Scheduled",  color: "#5b7cf6" },
  { value: "completed",  label: "Completed",  color: "#22c55e" },
  { value: "cancelled",  label: "Cancelled",  color: "#ef4444" },
];

interface Props {
  appointment: Appointment | null;
  onClose: () => void;
  onSave: (id: string, data: Partial<Appointment>) => Promise<void>;
}

export default function EditAppointmentModal({ appointment, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<Appointment>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appointment) {
      setForm({
        date:    appointment.date,
        time:    appointment.time,
        service: appointment.service,
        status:  appointment.status,
        notes:   appointment.notes,
      });
      setSaved(false);
      setError(null);
    }
  }, [appointment]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!appointment) return null;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(appointment.id, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const status = statusOptions.find(s => s.value === form.status);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "20px",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-strong)",
          borderRadius: "14px",
          overflow: "hidden",
          animation: "slideUp 0.15s ease",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
        }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Edit Appointment
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
              {appointment.name} · {appointment.email}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "30px", height: "30px",
              borderRadius: "7px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.12s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Status pills */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              Status
            </label>
            <div style={{ display: "flex", gap: "6px" }}>
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, status: opt.value }))}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: "8px",
                    border: `1px solid ${form.status === opt.value ? opt.color + "50" : "var(--border)"}`,
                    background: form.status === opt.value ? `${opt.color}14` : "transparent",
                    color: form.status === opt.value ? opt.color : "var(--text-secondary)",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.12s",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date + Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                Date
              </label>
              <div style={{ position: "relative" }}>
                <Calendar size={13} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                <input
                  type="date"
                  value={form.date ?? ""}
                  onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                  className="input-field"
                  style={{ paddingLeft: "30px", fontSize: "12px" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                Time
              </label>
              <div style={{ position: "relative" }}>
                <Clock size={13} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                <input
                  type="time"
                  value={form.time ?? ""}
                  onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
                  className="input-field"
                  style={{ paddingLeft: "30px", fontSize: "12px" }}
                />
              </div>
            </div>
          </div>

          {/* Service */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              Service
            </label>
            <div style={{ position: "relative" }}>
              <Briefcase size={13} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
              <select
                value={form.service ?? ""}
                onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                className="input-field"
                style={{ paddingLeft: "30px", fontSize: "12px" }}
              >
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FileText size={11} />
                Notes & Comments
              </div>
            </label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Add notes, observations, or follow-up instructions…"
              rows={4}
              className="input-field"
              style={{
                fontSize: "12px",
                resize: "vertical",
                minHeight: "90px",
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Meta info */}
          <div style={{
            padding: "10px 12px",
            borderRadius: "8px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            display: "flex",
            gap: "20px",
          }}>
            {[
              { label: "Created", value: new Date(appointment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
              { label: "Updated", value: new Date(appointment.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "9px 12px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", fontSize: "12px", color: "#f87171" }}>
              <AlertCircle size={13} /> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          gap: "8px",
          padding: "14px 20px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            {saving ? (
              <div style={{ width: "13px", height: "13px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            ) : saved ? (
              <><CheckCircle size={13} /> Saved!</>
            ) : "Save changes"}
          </button>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes spin    { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
