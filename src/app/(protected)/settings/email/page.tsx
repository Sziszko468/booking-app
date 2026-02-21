"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Mail, Send, Clock, CheckCircle, XCircle, Bell } from "lucide-react";

export default function EmailSettingsPage() {
  const [settings, setSettings] = useState({
    sendConfirmation: true,
    sendReminder: true,
    reminderHours: 24,
    sendCancellation: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [testMode, setTestMode] = useState<boolean>(false);

  // Check email API status
  useEffect(() => {
    fetch("/api/email-status")
      .then((res) => res.json())
      .then((data) => {
        setEmailConfigured(data.configured);
        setTestMode(data.testMode || false);
      })
      .catch(() => setEmailConfigured(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.setItem("emailSettings", JSON.stringify(settings));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header */}
          <div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Email Notifications
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
              Configure automated email reminders and confirmations
            </div>
          </div>

          {/* API Status */}
          <div className="card" style={{
            background: emailConfigured
              ? "rgba(34,197,94,0.08)"
              : testMode
              ? "rgba(91,124,246,0.08)"
              : "rgba(245,158,11,0.08)",
            borderColor: emailConfigured
              ? "rgba(34,197,94,0.2)"
              : testMode
              ? "rgba(91,124,246,0.2)"
              : "rgba(245,158,11,0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: emailConfigured
                  ? "rgba(34,197,94,0.15)"
                  : testMode
                  ? "rgba(91,124,246,0.15)"
                  : "rgba(245,158,11,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {emailConfigured ? (
                  <CheckCircle size={18} color="#4ade80" />
                ) : testMode ? (
                  <Bell size={18} color="#7b9af8" />
                ) : (
                  <XCircle size={18} color="#fbbf24" />
                )}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {emailConfigured === null
                    ? "Checking email service..."
                    : emailConfigured
                    ? "Email service connected"
                    : testMode
                    ? "Running in TEST MODE"
                    : "Email service not configured"}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                  {emailConfigured === null
                    ? "Please wait..."
                    : emailConfigured
                    ? "Resend API is active and ready to send emails"
                    : testMode
                    ? "Emails are simulated (not actually sent). Add real API key to send emails."
                    : "Add RESEND_API_KEY to your .env.local file"}
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>
              Notification Settings
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Confirmation emails */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={settings.sendConfirmation}
                  onChange={(e) => setSettings((s) => ({ ...s, sendConfirmation: e.target.checked }))}
                  style={{ marginTop: "3px", cursor: "pointer" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <Mail size={16} style={{ color: "var(--accent)" }} />
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                      Send confirmation emails
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    Automatically send a confirmation email when a new appointment is booked
                  </div>
                </div>
              </div>

              <div className="divider" />

              {/* Reminder emails */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={settings.sendReminder}
                  onChange={(e) => setSettings((s) => ({ ...s, sendReminder: e.target.checked }))}
                  style={{ marginTop: "3px", cursor: "pointer" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <Clock size={16} style={{ color: "#f59e0b" }} />
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                      Send reminder emails
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                    Send automated reminders before scheduled appointments
                  </div>

                  {settings.sendReminder && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <label style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                        Send reminder
                      </label>
                      <select
                        value={settings.reminderHours}
                        onChange={(e) => setSettings((s) => ({ ...s, reminderHours: Number(e.target.value) }))}
                        className="input-field"
                        style={{ width: "auto", padding: "4px 8px", fontSize: "12px" }}
                      >
                        <option value={1}>1 hour</option>
                        <option value={3}>3 hours</option>
                        <option value={6}>6 hours</option>
                        <option value={12}>12 hours</option>
                        <option value={24}>24 hours</option>
                        <option value={48}>48 hours</option>
                      </select>
                      <label style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                        before appointment
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="divider" />

              {/* Cancellation emails */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={settings.sendCancellation}
                  onChange={(e) => setSettings((s) => ({ ...s, sendCancellation: e.target.checked }))}
                  style={{ marginTop: "3px", cursor: "pointer" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <XCircle size={16} style={{ color: "#ef4444" }} />
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                      Send cancellation emails
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    Notify clients when their appointment is cancelled
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? (
                  <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                ) : saved ? (
                  <><CheckCircle size={14} /> Saved</>
                ) : (
                  <><Send size={14} /> Save Settings</>
                )}
              </button>
            </div>
          </div>

          {/* Setup Guide */}
          <div className="card" style={{ background: "rgba(91,124,246,0.04)", borderColor: "rgba(91,124,246,0.15)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <Bell size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                  Setup Guide
                </div>
                <ol style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: "20px", margin: 0 }}>
                  <li>Sign up for a free account at <a href="https://resend.com" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>resend.com</a></li>
                  <li>Generate an API key from your Resend dashboard</li>
                  <li>Add <code style={{ background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px", fontSize: "11px" }}>RESEND_API_KEY=re_...</code> to your <code style={{ background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px", fontSize: "11px" }}>.env.local</code> file</li>
                  <li>Restart your Next.js dev server</li>
                  <li>Test by creating a new appointment via the public booking form</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}
