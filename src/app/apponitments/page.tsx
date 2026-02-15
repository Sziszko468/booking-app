"use client";

import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { initialAppointments } from "@/data/appointments";
import { Appointment } from "@/types/appointment";
import styles from "./Appointments.module.scss";

export default function AppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <h2>Appointments</h2>

        <div className={styles.container}>
          {appointments.length === 0 ? (
            <div className={styles.emptyState}>
              No appointments found.
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Service</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.service}</td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
