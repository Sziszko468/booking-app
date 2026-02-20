"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as appointmentService from "@/services/appointmentApi";
import { Calendar, Clock, User, Mail, Briefcase, CheckCircle, ArrowRight } from "lucide-react";

const services = [
  { value: "Consultation",    duration: "30 min", price: "$50" },
  { value: "Follow-up",       duration: "15 min", price: "$30" },
  { value: "Treatment",       duration: "60 min", price: "$100" },
  { value: "Check-up",        duration: "30 min", price: "$40" },
  { value: "Therapy Session", duration: "45 min", price: "$80" },
  { value: "Assessment",      duration: "60 min", price: "$120" },
];

export default function PublicBookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: services[0].value,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Form submitted!");
    console.log("📝 Form data:", formData);
    
    // Validate all fields
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.service) {
      console.error("❌ Missing fields:", { 
        name: !!formData.name, 
        email: !!formData.email, 
        date: !!formData.date, 
        time: !!formData.time, 
        service: !!formData.service 
      });
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      console.log("📞 Calling createAppointment...");
      const newAppointment = await appointmentService.createAppointment({
        ...formData,
        status: "scheduled",
        notes: "Booked via public form",
      });
      console.log("✅ Appointment created:", newAppointment);

      // Send confirmation email
      try {
        console.log("📧 Sending confirmation email...");
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "confirmation",
            appointment: newAppointment,
          }),
        });
        console.log("📧 Email response status:", emailResponse.status);
        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log("📧 Email result:", emailResult);
        } else {
          const errorText = await emailResponse.text();
          console.error("📧 Email failed:", errorText);
        }
      } catch (emailError) {
        console.error("❌ Failed to send confirmation email:", emailError);
        // Don't block booking if email fails
      }

      console.log("✅ Setting success state...");
      setStep("success");
    } catch (error) {
      console.error("❌ Booking error:", error);
      setError(error instanceof Error ? error.message : "Failed to book appointment. Please try again.");
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const selectedService = services.find((s) => s.value === formData.service);

  if (step === "success") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, var(--bg-primary) 0%, #0a0a14 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "480px",
          textAlign: "center",
          animation: "fadeIn 0.5s ease",
        }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            border: "2px solid rgba(34,197,94,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <CheckCircle size={32} color="#4ade80" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
            Booking Confirmed!
          </div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
            We`ve sent a confirmation email to <strong>{formData.email}</strong>
          </div>
          <div className="card" style={{ textAlign: "left", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "12px" }}>
              Appointment Details
            </div>
            {[
              { label: "Name", value: formData.name },
              { label: "Service", value: formData.service },
              { label: "Date", value: new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
              { label: "Time", value: formData.time },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{label}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push("/")}
            className="btn-secondary"
            style={{ width: "100%" }}
          >
            Back to Home
          </button>
        </div>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, var(--bg-primary) 0%, #0a0a14 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(91,124,246,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "540px", position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "var(--accent)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 0 24px rgba(91,124,246,0.4)",
          }}>
            <Calendar size={24} color="#fff" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Book an Appointment
          </div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "6px" }}>
            Choose your preferred date, time, and service
          </div>
        </div>

        {/* Form */}
        <div className="card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-strong)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Doe"
                  className="input-field"
                  style={{ paddingLeft: "36px" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  placeholder="jane@example.com"
                  className="input-field"
                  style={{ paddingLeft: "36px" }}
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Service
              </label>
              <div style={{ position: "relative" }}>
                <Briefcase size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData((f) => ({ ...f, service: e.target.value }))}
                  className="input-field"
                  style={{ paddingLeft: "36px" }}
                >
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.value} — {s.duration} • {s.price}
                    </option>
                  ))}
                </select>
              </div>
              {selectedService && (
                <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  Duration: {selectedService.duration} • Price: {selectedService.price}
                </div>
              )}
            </div>

            {/* Date + Time */}
            <div className="date-time-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Date
                </label>
                <div style={{ position: "relative" }}>
                  <Calendar size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData((f) => ({ ...f, date: e.target.value }))}
                    className="input-field"
                    style={{ paddingLeft: "36px" }}
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
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData((f) => ({ ...f, time: e.target.value }))}
                    className="input-field"
                    style={{ paddingLeft: "36px" }}
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: "12px", color: "#f87171" }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", height: "42px", marginTop: "6px" }}
            >
              {loading ? (
                <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              ) : (
                <>
                  Book Appointment
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "var(--text-tertiary)" }}>
          Need help? Contact us at <span style={{ color: "var(--accent)" }}>support@bookinghub.com</span>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
