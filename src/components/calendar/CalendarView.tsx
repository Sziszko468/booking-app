"use client";

import { useState } from "react";
import { Appointment } from "@/types/appointment";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface Props {
  appointments: Appointment[];
  onDateClick?: (date: string) => void;
  onAppointmentClick?: (appt: Appointment) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarView({ appointments, onDateClick, onAppointmentClick }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.filter((a) => a.date === dateStr);
  };

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  // Build calendar grid
  const calendarDays: Array<{ day: number; isCurrentMonth: boolean; dateStr: string }> = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const month = currentMonth === 0 ? 11 : currentMonth - 1;
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      dateStr: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }

  // Next month days to fill grid
  const remaining = 42 - calendarDays.length;
  for (let day = 1; day <= remaining; day++) {
    const month = currentMonth === 11 ? 0 : currentMonth + 1;
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
          {MONTHS[currentMonth]} {currentYear}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={goToToday} className="btn-ghost" style={{ fontSize: "12px" }}>
            Today
          </button>
          <button onClick={prevMonth} className="btn-ghost" style={{ padding: "6px" }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="btn-ghost" style={{ padding: "6px" }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
        background: "var(--bg-card)",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid var(--border)",
      }}>
        {/* Day headers */}
        {DAYS.map((day) => (
          <div key={day} style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-tertiary)",
            padding: "6px 0",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map(({ day, isCurrentMonth, dateStr }, idx) => {
          const dayAppointments = isCurrentMonth ? getAppointmentsForDate(day) : [];
          const isThisToday = isCurrentMonth && isToday(day);

          return (
            <div
              key={idx}
              onClick={() => isCurrentMonth && onDateClick?.(dateStr)}
              style={{
                minHeight: "80px",
                padding: "6px",
                borderRadius: "6px",
                background: isThisToday ? "rgba(91,124,246,0.08)" : "var(--bg-secondary)",
                border: isThisToday ? "1px solid rgba(91,124,246,0.3)" : "1px solid var(--border)",
                cursor: isCurrentMonth ? "pointer" : "default",
                opacity: isCurrentMonth ? 1 : 0.4,
                transition: "all 0.12s",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
              onMouseEnter={(e) => {
                if (isCurrentMonth) {
                  e.currentTarget.style.background = isThisToday ? "rgba(91,124,246,0.12)" : "var(--bg-card-hover)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }
              }}
              onMouseLeave={(e) => {
                if (isCurrentMonth) {
                  e.currentTarget.style.background = isThisToday ? "rgba(91,124,246,0.08)" : "var(--bg-secondary)";
                  e.currentTarget.style.borderColor = isThisToday ? "rgba(91,124,246,0.3)" : "var(--border)";
                }
              }}
            >
              <div style={{
                fontSize: "13px",
                fontWeight: isThisToday ? 700 : 500,
                color: isThisToday ? "var(--accent)" : isCurrentMonth ? "var(--text-primary)" : "var(--text-tertiary)",
              }}>
                {day}
              </div>

              {/* Appointment dots */}
              {dayAppointments.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "auto" }}>
                  {dayAppointments.slice(0, 3).map((appt) => (
                    <div
                      key={appt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAppointmentClick?.(appt);
                      }}
                      style={{
                        fontSize: "10px",
                        padding: "2px 4px",
                        borderRadius: "3px",
                        background: appt.status === "completed" ? "rgba(34,197,94,0.15)" :
                                   appt.status === "cancelled" ? "rgba(239,68,68,0.15)" :
                                   "rgba(91,124,246,0.15)",
                        color: appt.status === "completed" ? "#4ade80" :
                               appt.status === "cancelled" ? "#f87171" : "#7b9af8",
                        border: `1px solid ${appt.status === "completed" ? "rgba(34,197,94,0.3)" :
                                             appt.status === "cancelled" ? "rgba(239,68,68,0.3)" :
                                             "rgba(91,124,246,0.3)"}`,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: 500,
                      }}
                      title={`${appt.time} - ${appt.name}`}
                    >
                      {appt.time} {appt.name.split(" ")[0]}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div style={{ fontSize: "10px", color: "var(--text-tertiary)", textAlign: "center" }}>
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "var(--text-secondary)" }}>
        {[
          { label: "Scheduled", color: "#7b9af8" },
          { label: "Completed", color: "#4ade80" },
          { label: "Cancelled", color: "#f87171" },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
