"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import CalendarView from "@/components/calendar/CalendarView";
import EditAppointmentModal from "@/components/appointments/EditAppointmentModal";
import { useAppointments } from "@/hooks/useAppointments";
import { Appointment } from "@/types/appointment";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarPage() {
  const router = useRouter();
  const { appointments, loading, updateAppointment } = useAppointments();
  const [editTarget, setEditTarget] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleSave = async (id: string, data: Partial<Appointment>) => {
    await updateAppointment(id, data);
    setEditTarget((prev) => (prev ? { ...prev, ...data } : null));
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    // Could open a "new appointment" modal with this date pre-filled
  };

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
        <div style={{ maxWidth: "1200px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Calendar
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
                {appointments.length} appointment{appointments.length !== 1 ? "s" : ""} scheduled
              </div>
            </div>
            <button className="btn-primary" onClick={() => router.push("/appointments/new")}>
              <Plus size={14} />
              New Booking
            </button>
          </div>

          {/* Calendar */}
          <CalendarView
            appointments={appointments}
            onDateClick={handleDateClick}
            onAppointmentClick={(appt) => setEditTarget(appt)}
          />

          {/* Selected date info */}
          {selectedDate && (
            <div className="card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-strong)" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                Selected: {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
              <button
                onClick={() => {
                  router.push(`/appointments/new?date=${selectedDate}`);
                }}
                className="btn-primary"
                style={{ fontSize: "12px" }}
              >
                <Plus size={13} />
                Create appointment on this date
              </button>
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